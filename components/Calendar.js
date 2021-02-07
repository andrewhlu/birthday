import styles from '../styles/Calendar.module.css';

export default function Calendar(props) {
    return (
        <div className={styles.calendarIcon}>
            <div className={styles.top}>{props.month}</div>
            <div className={styles.bottom}>{props.day}</div>
        </div>
    );
}
