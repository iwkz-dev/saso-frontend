import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getOrderList } from '../../../stores/reducers/order';
import { Button, Typography, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import styles from './orderList.module.scss';
import { formatDate } from '../../../helpers/dateHelper';
import { getToken } from '../../../helpers/authHelper';

const OrderList = ({ setOpenOrderList }) => {
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);

  useEffect(() => {
    console.log(order);
    dispatch(getOrderList());
  }, []);

  const backClickHandler = () => {
    setOpenOrderList(false);
  };

  const handleClick = async orderId => {
    axios({
      url: `https://saso.iwkz.de/api/v1/customer/order/${orderId}/generatePdf`,
      method: 'post',
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    }).then(response => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Schedule day.pdf`);
      document.body.appendChild(link);
      link.click();
    });
  };

  const reformStatus = status => {
    if (status == 1) {
      return 'Paid';
    } else if (status == 2) {
      return 'Refund/cancel';
    } else if (status == 3) {
      return 'Done';
    } else {
      return 'Wait for confirmation';
    }
  };

  return (
    <div className={styles.container}>
      <Button
        variant="outlined"
        size="small"
        onClick={backClickHandler}
        className={styles.backButton}
      >
        Back
      </Button>
      <div className={styles.paymentAddress}>
        <Typography variant="h6" align="center">
          Pembayaran dapat dibayarkan melalui:
          <br />
        </Typography>
        <Typography align="center">
          Indonesischer Weisheits- und Kulturzentrum e.V.
          <br />
          IBAN: DE29 1001 0010 0346 6691 06
          <br />
          BIC: PBNKDEFF
          <br />
          Verwendungszweck: SS21-0001
          <br />
        </Typography>
      </div>
      <Divider />
      <Typography variant="h6" align="center">
        Your Order List
      </Typography>
      <div className={styles.table}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table sx={{ minWidth: 280 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Nr.</TableCell>
                <TableCell>Inovice Nr.</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Download PDF</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.data.data.map((data, i) => (
                <TableRow
                  key={data.invoiceNumber}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{data.invoiceNumber}</TableCell>
                  <TableCell>{reformStatus(data.status)}</TableCell>
                  <TableCell
                    onClick={() => handleClick(data._id)}
                    className={styles.downloadPdf}
                  >
                    Download here
                  </TableCell>
                  <TableCell>
                    {formatDate(data.created_at, true, true)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default OrderList;
