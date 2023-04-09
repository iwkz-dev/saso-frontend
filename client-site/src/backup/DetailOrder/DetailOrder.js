import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail } from '../../../stores/reducers/order';
import { Button, Typography, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { formatDate } from '../../../helpers/dateHelper';
import styles from './detailOrder.module.scss';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

const DetailOrder = ({ orderId, setSelectedOrderId }) => {
  const dispatch = useDispatch();
  const detailOrder = useSelector(state => state.order.data.detailOrder);

  useEffect(() => {
    dispatch(getOrderDetail(orderId));
  }, [orderId]);

  const backClickHandler = () => {
    setSelectedOrderId(null);
  };

  const saveInvoice = () => {
    window.print();
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
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <div>
          <Button variant="outlined" size="small" onClick={backClickHandler}>
            See Order List
          </Button>
        </div>
        <div>
          <Button variant="outlined" size="small" onClick={saveInvoice}>
            <LocalPrintshopIcon
              sx={{ marginRight: '5px', fontSize: 'medium' }}
            />{' '}
            Save Invoice
          </Button>
        </div>
      </Box>
      <div>
        <Typography variant="h6" align="center">
          Invoice {detailOrder.invoiceNumber}
        </Typography>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table sx={{ minWidth: 280 }} aria-label="a dense table">
            <TableRow>
              <TableCell sx={{ fontWeight: 'medium' }}>
                Customer Fullname
              </TableCell>
              <TableCell>{detailOrder.customerFullname}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'medium' }}>
                {' '}
                Customer Email
              </TableCell>
              <TableCell>{detailOrder.customerEmail}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'medium' }}>
                Customer Phone
              </TableCell>
              <TableCell>{detailOrder.customerPhone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'medium' }}>Total Price</TableCell>
              <TableCell>{detailOrder.totalPrice}€</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'medium' }}>Status</TableCell>
              <TableCell>
                <Chip
                  label={reformStatus(detailOrder.status)}
                  color={reformColor(detailOrder.status)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'medium' }}>Arrived At</TableCell>
              <TableCell>{detailOrder.arrived_at}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'medium' }}>Note</TableCell>
              <TableCell>{detailOrder.note}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'medium' }}>Updated At</TableCell>
              <TableCell>
                {formatDate(detailOrder.updated_at, true, true)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'medium' }}>Created At</TableCell>
              <TableCell>
                {formatDate(detailOrder.created_at, true, true)}
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
        <div className={styles.orderedMenus}>
          <Typography variant="h6" align="center">
            Ordered Menu(s)
          </Typography>
          <TableContainer component={Paper} className={styles.tableContainer}>
            <Table sx={{ minWidth: 280 }} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nr.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Portion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detailOrder?.menus?.map((data, i) => (
                  <TableRow
                    key={data._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => handleClick(data._id)}
                  >
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.price}€</TableCell>
                    <TableCell>{data.totalPortion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
