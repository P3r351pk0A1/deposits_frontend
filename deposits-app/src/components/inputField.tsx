import { FC } from 'react'
import { Button } from 'react-bootstrap'
import "../assets/css/inputField.css";

interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
    inputClass?: string
}

const InputField: FC<Props> = ({ onSubmit, value, setValue, loading, placeholder, buttonTitle = 'Поиск'}) => {

    return (
        <div className="inputFieldBox">
            <input value={value} className='inputField' placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
            <Button className='ms-3' variant='outline-danger' disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
        </div>
    )
}

export default InputField;