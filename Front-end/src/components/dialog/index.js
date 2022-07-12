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
import CloseIcon from '@mui/icons-material/Close';
import styles from './DialogModal.module.scss'
export default function DialogModal(props) {
    const { open, setOpen, setDataForm, item } = props;
    const [endTime, setEndTime] = React.useState(null);
    const [startTime, setStartTime] = React.useState(new Date());
    const [title, setTitle] = React.useState('');
    const [des, setDes] = React.useState('');

    React.useEffect(() => {
        if (item) {
            setTitle(item.title)
            setDes(item.description)
            if (item.endDate) {
                setEndTime(moment(item.endDate).format())
            }
        }
    }, [item]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const timeFormat = moment(endTime).format();
        if (typeof (setDataForm) === "function") {
            const object = {
                endDate: timeFormat,
                title,
                description: des,
                startDate: startTime
            }
            if (item && item.id) {
                setDataForm({
                    ...object,
                    id: item.id,
                    startDate: item.startDate,
                    status: item.status
                })
            } else {
                setDataForm(object)
            }
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className={styles.Dialog}
        >
            <DialogTitle className={styles.DialogTitle}>
                <span>Make a todo for the new day</span>
                <CloseIcon onClick={handleClose} />
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
                    <span>Start Date</span>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Time"
                            value={startTime}
                            onChange={(newValue) => {
                                setStartTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <span>End Date</span>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Time"
                            value={endTime}
                            onChange={(newValue) => {
                                setEndTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
            </DialogContent>
            <DialogActions className={styles.DialogActions}>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
