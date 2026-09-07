import styles from './JournalForm.module.css';
import Button from '../Button/Button.jsx';
import {useContext, useEffect, useReducer, useRef} from 'react';
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from './JournalFrom.state.js';
import Input from '../Input/Input.jsx';
import {UserContext} from '../../context/user.context.jsx';

function JournalForm({onSubmit, data}) {

    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const {isValid, isFormReadyToSubmit, values} = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const postRef = useRef();
    const {userId} = useContext(UserContext);

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.post:
                postRef.current.focus();
                break;
        }
    };

    useEffect(() => {
        dispatchForm({type: 'SET_VALUE', payload: {...data}});
    }, [data]);

    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.post || !isValid.title) {
            focusError(isValid);
            timerId = setTimeout(() => {
                dispatchForm({type: 'RESET_VALIDITY'});
            }, 1000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isValid]);

    useEffect(() => {
        if (isFormReadyToSubmit) {
            onSubmit(values);
            dispatchForm({type: 'CLEAR'});
            dispatchForm({type: 'SET_VALUE', payload: {userId}});
        }
    }, [isFormReadyToSubmit, values, onSubmit, userId]);

    useEffect(() => {
        dispatchForm({type: 'SET_VALUE', payload: {userId}});
    }, [userId]);

    const onChange = (e) => {
        dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
    };

    const addJournalItem = (e) => {
        e.preventDefault();
        dispatchForm({type: 'SUBMIT'});
    };

    return (

        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <div className={cn(styles.headerForm)}>
                <Input type="text" ref={titleRef} isValid={isValid.title} value={values.title} onChange={onChange}
                       name="title" appearance="title"/>
                <img className={cn(styles.iconForm)} src="/title.svg" alt="иконка"/>
            </div>
            <div className={cn(styles.formDetails)}>
                <div className={cn(styles.itemFormDetails)}>
                    <label htmlFor="date" className={cn(styles.formLabel)}>
                        <img className={cn(styles.iconForm)} src="/calendar.svg" alt="иконка"/>
                        <span className={cn(styles.labelText)}>Дата</span>
                    </label>
                    <Input type="date" ref={dateRef} isValid={isValid.date} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
                           onChange={onChange} name="date" appearance="date"/>
                </div>
                <div className={cn(styles.itemFormDetails)}>
                    <label htmlFor="date" className={cn(styles.formLabel)}>
                        <img className={cn(styles.iconForm)} src="/key.svg" alt="иконка"/>
                        <span className={cn(styles.labelText)}>Метки</span>
                    </label>
                    <Input type="text" value={values.tag} onChange={onChange}
                           name="tag" appearance="tag" placeholder="Спорт"/>
                </div>
            </div>
            <textarea name="post" id="" ref={postRef} onChange={onChange} value={values.post} cols="30" rows="10"
                      className={cn(styles.descriptionText, {[styles.invalid]: !isValid.post})}/>
            <Button>Сохранить</Button>
        </form>
    );
}

export default JournalForm;