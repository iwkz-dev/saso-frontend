import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Typography, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import styles from './orderList.module.scss';

const OrderList = ({ setOpenOrderList }) => {
  const backClickHandler = () => {
    setOpenOrderList(false);
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData(
      'SS22-12',
      'Wait for Confirmation',
      '23 Agustus 2022, 11.33',
      ' Download'
    ),
    createData('SS22-13', 'Refund', '23 Agustus 2022, 11.33', ' Download'),
    createData('SS22-24', 'Paid', '23 Agustus 2022, 11.33', ' Download'),
  ];

  console.log(rows);

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
      <Typography variant="h6" align="center">
        Your Order List
      </Typography>
      <div className={styles.table}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 280 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Inovice Nr.</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Download PDF</TableCell>
                <TableCell align="right">Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Divider />
      <div>
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
    </div>
  );
};

export default OrderList;
