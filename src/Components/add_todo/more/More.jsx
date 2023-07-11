import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined';
import styles from './More.module.css'
import DeleteIcon from '@mui/icons-material/Delete';

export default function MorePopOver(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={styles.Div}>
      <button className={styles.moreBtn} onClick={handleClick}>
        <MoreHorizOutlined fontSize="small" color="disabled"/>
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
              <Typography sx={{ p: 2 }}><button
          onClick={props.func}
          className={styles.dltBtn}
              >
                  <DeleteIcon /></button></Typography>
      </Popover>
    </div>
  );
}