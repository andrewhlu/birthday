import styles from '../styles/Cake.module.css';

// Adapted from https://lenadesign.org/2020/03/11/bday-cake-css-animation/

export default function Cake(props) {
    return (
        <>
            <div className={styles.row}>
                <img src={`/numbers/${props.age.toString()[0]}.png`} alt={props.age.toString()[0]}></img>
                {props.age.toString().length > 1 &&
                    <img src={`/numbers/${props.age.toString()[1]}.png`} alt={props.age.toString()[1]}></img>
                }
                {props.age.toString().length > 2 &&
                    <img src={`/numbers/${props.age.toString()[2]}.png`} alt={props.age.toString()[2]}></img>
                }
            </div>

            <div className={styles.container}>
                <div className={styles.holder}></div>
                <div className={styles.holder2}></div>
                <div className={styles.shadow}></div>
                <div className={styles.cake}></div>
            </div>
        </>
    );
}