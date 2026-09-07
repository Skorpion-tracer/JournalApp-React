import styles from './Input.module.css';
import cn from 'classnames';
import {forwardRef} from 'react';

const Input = forwardRef(function Input({className, isValid = true, appearance, ...props}, ref) {

    return (
        <>
            <input {...props} ref={ref} className={cn(className,
                {
                    [styles.invalid]: !isValid,
                    [styles.input]: appearance === 'title',
                    [styles.inputDate]: appearance === 'date',
                    [styles.inputEmpty]: appearance === 'tag'
                })}/>
        </>
    );
});

export default Input;