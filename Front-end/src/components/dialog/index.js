import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import moment from 'moment';
import styles from './DialogModal.module.scss'
export default function DialogModal(props) {
    const { open, setOpen, setDataForm, item } = props;
    const [endTime, setEndTime] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [des, setDes] = React.useState('');

    React.useEffect(() => {
        if (item) {
            setTitle(item.title)
            setDes(item.des)
            if (item.endTime && item.timeNoneFormat) {
                setEndTime(JSON.parse(item.timeNoneFormat))
            }
        }
    }, [item]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const timeFormat = moment(endTime).format("MMM Do YY");
        if (typeof (setDataForm) === "function") {
            const object = {
                endTime: timeFormat !== "Invalid date" ? timeFormat : "",
                timeNoneFormat: JSON.stringify(endTime),
                title,
                des
            }
            if (item && item.id) {
                setDataForm({...object, id: item.id})
            } else {
                setDataForm(object)
            }

            handleClose()
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={styles.Dialog}
        >
            <DialogTitle id="alert-dialog-title">
                Make a todo for the new day
            </DialogTitle>
            <DialogContent className={styles.form}>
                <div className={styles.formInput}>
                    <span>Title</span>
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.formInput}>
                    <span>Description</span>
                    <TextareaAutosize
                        className={styles.area}
                        aria-label="empty textarea"
                        placeholder="Empty"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />
                </div>
                <div className={styles.formInput}>
                    <span>End Time</span>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Basic example"
                            value={endTime}
                            onChange={(newValue) => {
                                setEndTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleSubmit}>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}
