import React from "react";
import Button from "../button/Button";
import InputIconComponent from "../inputIconComponent/InputIconComponent";

const FormAddValues = (props) => {

    return (
        <form onSubmit={props.submit} method='POST' className='mt-3'>

            <InputIconComponent
                icon={<div>R$</div>}
                input={
                    <input
                        onChange={props.setValue}
                        value={props.valueSetValue}
                        type="number"
                        className="form-control p-2"
                        placeholder="Informe um valor..."
                        min="0.00"
                        max="10000.00"
                        step="0.01"
                    />
                }
            />

            <div className="form-group">
                <select onChange={props.setType} className="form-select p-2"
                    value={props.valueType}>
                    <option value="">Selecione o Tipo...</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Saída">Saída</option>
                </select>
            </div>

            <div className="form-group mt-3">
                <textarea onChange={props.setDescription} value={props.valueDescription} className='form-control' cols="30" rows="3" placeholder='Descrição...'></textarea>
            </div>

            <Button
                type="submit"
                class="btn btn-primary shadow-sm"
                text={props.textBtn}
            />

        </form>
    )

}

export default FormAddValues