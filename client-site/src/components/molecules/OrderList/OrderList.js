import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { getOrderList } from '../../../stores/reducers/order';
import { Button, Typography, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import styles from './orderList.module.scss';
import { formatDate } from '../../../helpers/dateHelper';
import DetailOrder from '../DetailOrder/DetailOrder';

const OrderList = ({ setOpenOrderList, event }) => {
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  console.log(event);

  useEffect(() => {
    dispatch(getOrderList());
  }, []);

  const backClickHandler = () => {
    setOpenOrderList(false);
  };

  const handleClick = orderId => {
    setSelectedOrderId(orderId);
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

  const reformColor = status => {
    if (status == 1) {
      return 'primary';
    } else if (status == 2) {
      return 'error';
    } else if (status == 3) {
      return 'success';
    } else {
      return 'default';
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
        <Typography sx={{ fontSize: "0.8rem" }} align="center">
          Indonesischer Weisheits- und Kulturzentrum e.V.
        </Typography>
        {
          event.iban ? (
            <Typography sx={{ fontSize: "0.8rem" }} align="center">
              Bank: {event.bankName}
              <br />
              IBAN: {event.iban}
              <br />
              BIC: {event.bic}
              <br />
              Verwendungszweck: {event.usageNote}
            </Typography>
          ) : ""
        }
        <br />
        {
          event.paypal ? (
            <Typography sx={{ fontSize: "0.8rem" }} align="center">
              Paypal: {event.paypal}
            </Typography>
          ) : ""
        }
        <br />
        <Typography sx={{ fontSize: "0.8rem" }} align="center">
          *Setelah membayar pesanan, mohon konfirmasi ke CP dengan mengirimkan
          bukti transfer
        </Typography>
      </div>
      <Divider />
      {selectedOrderId ? (
        <DetailOrder
          orderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
        />
      ) : (
        <div>
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
                    <TableCell>Updated</TableCell>
                    <TableCell>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.data.data.map((data, i) => (
                    <TableRow
                      key={data.invoiceNumber}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        cursor: 'pointer',
                      }}
                      onClick={() => handleClick(data._id)}
                      hover={true}
                    >
                      {data.event === event._id ? (
                        <>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{data.invoiceNumber}</TableCell>
                          <TableCell>
                            <Chip
                              label={reformStatus(data.status)}
                              color={reformColor(data.status)}
                            />
                          </TableCell>
                          <TableCell>
                            {formatDate(data.updated_at, true, true)}
                          </TableCell>
                          <TableCell>
                            {formatDate(data.created_at, true, true)}
                          </TableCell>
                        </>
                      ) : null}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
