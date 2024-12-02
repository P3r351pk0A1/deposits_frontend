import { FC } from 'react'
import { Button } from 'react-bootstrap'
import "../assets/css/inputField.css";

import { useEffect, createContext, useContext, useReducer } from 'react';

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: (value: string) => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
    inputClass?: string
}

// const InputField: FC<Props> = ({ value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Поиск', inputClass='search' }) => {
//     return (
//         <div className="inputField">
//             <input value={value} className={inputClass} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
//             <Button className='ms-3' variant='outline-danger' disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
//         </div>
//     )
// }

const SearchContext = createContext<{ state: { value: string }, dispatch: React.Dispatch<any> }>({ state: { value: '' }, dispatch: () => null });

const searchReducer = (state: { value: string }, action: { type: string, payload: string }) => {
    switch (action.type) {
        case 'SET_VALUE':
            return { ...state, value: action.payload };
        default:
            return state;
    }
};

const initialState = { value: '' };

export const SearchProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(searchReducer, initialState);

    useEffect(() => {
        const savedState = localStorage.getItem('searchState');
        if (savedState) {
            dispatch({ type: 'SET_VALUE', payload: JSON.parse(savedState).value });
        }
    }, []);

    useEffect(() => {
        if (state.value !== '') {
            localStorage.setItem('searchState', JSON.stringify(state));
        }
    }, [state]);

    return (
        <SearchContext.Provider value={{ state, dispatch }}>
            {children}
        </SearchContext.Provider>
    );
};


const InputField: FC<Props> = ({ onSubmit, loading, placeholder, buttonTitle = 'Поиск', inputClass='search' }) => {
    const { state, dispatch } = useContext(SearchContext);

    const setValue = (value: string) => {
        dispatch({ type: 'SET_VALUE', payload: value });
    };

    return (
        <div className="inputField">
            <input value={state.value} className={inputClass} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
            <Button className='ms-3' variant='outline-danger' disabled={loading} onClick={() => onSubmit(state.value)}>{buttonTitle}</Button>
        </div>
    )
}

export default InputField;