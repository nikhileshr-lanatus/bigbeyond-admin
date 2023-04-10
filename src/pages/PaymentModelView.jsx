import {
  Dialog,
  DialogContent,
  CircularProgress,
  TableHead,
  DialogActions,
  Button,
  TableBody,
  DialogTitle,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#555555",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&.total": {
    borderTop: "1.5px solid black",
  },
  "&.finalTotal": {
    borderTop: "2px solid black",
    backgroundColor: "#D3D3D3",
  },
}));
const PaymentCalculationDialog = ({
  open,
  onClose,
  paymentObj,
  onClickCancel,
  payTheArtist,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Payment Calculation</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Particulars</StyledTableCell>
                <StyledTableCell align="right">Number</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Total Orders
                </StyledTableCell>
                <StyledTableCell align="right">
                  {paymentObj?.totalOrders}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Total Quantity
                </StyledTableCell>
                <StyledTableCell align="right">
                  {paymentObj?.totalQty}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Orders with product delivered and artist not paid
                </StyledTableCell>
                <StyledTableCell align="right">
                  {paymentObj?.dueOrders}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Quantity of Orders with product delivered and artist not paid
                </StyledTableCell>
                <StyledTableCell align="right">
                  {paymentObj?.dueQty}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  Amount / Unit
                </StyledTableCell>
                <StyledTableCell align="right">
                  {paymentObj?.amount}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow className="total">
                <StyledTableCell component="th" scope="row">
                  Pending Amount
                </StyledTableCell>
                <StyledTableCell align="right">
                  {paymentObj?.dueAmount}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  BigBeyond Fees
                </StyledTableCell>
                <StyledTableCell align="right">
                  {paymentObj?.artistCommission}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow className="finalTotal">
                <StyledTableCell component="th" scope="row">
                  Pending Total Amount
                </StyledTableCell>
                <StyledTableCell align="right">
                  {paymentObj?.payableAmount}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            margin: "0rem 1rem",
            marginBottom: "1rem",
          }}
          onClick={onClickCancel}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentCalculationDialog;
