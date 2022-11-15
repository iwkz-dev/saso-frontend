import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogTitle,
  IconButton,
  Divider,
  DialogContent,
  Box,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

function Modal({ onClose, open, title, children, width, padding }) {
  return (
    <Dialog onClose={onClose} open={Boolean(open)}>
      <DialogTitle onClose={onClose} sx={{ fontSize: '0.95rem' }}>
        {title}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: padding || '' }}>
        <Box sx={{ width: width || '500px' }}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
}
Modal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  padding: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  width: PropTypes.string,
};

export default Modal;