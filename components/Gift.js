import styles from '../styles/Gift.module.css';

export default function Gift(props) {
    const getImagePath = () => {
        return `/gifts/${props.opened ? "1" : "0"}.gif`;
    }

    return (
        <div className={styles.giftDiv}>
            <img src={getImagePath()}></img>

            {props.opened ?
                <p>{props.gift}</p>
            :
                <p>{props.name} sent you a gift!</p>
            }
            
        </div>
    );
}
