import useInput from "../../../hooks/useInput.js";
import Input from "../../Input/Input.component.jsx";
import Textarea from "../../Textarea/Textarea.component.jsx";
import {format} from "date-fns";
import {useState} from "react";

const AddEditActivity = ({ activity, onSubmit }) => {
    const formattedDate = activity?.dueDate ? format(new Date(activity.dueDate), 'yyyy-MM-dd') : '';
    const {value: dueDateValue, handleChange: handleDueDateChange} = useInput(formattedDate);
    const {value: nameValue, handleChange: handleNameChange} = useInput(activity?.name || '');
    const {value: descriptionValue, handleChange: handleDescriptionChange} = useInput(activity?.description || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            dueDate: new Date(dueDateValue).getTime(),
            name: nameValue,
            description: descriptionValue,
        }

        onSubmit(payload)
    }
    return <form className="form" id="add-edit-activity" onSubmit={handleSubmit}>
        <Input id="dueDate" name="dueDate" type="date" label="Data di scadenza" value={dueDateValue} onChange={handleDueDateChange}/>
        <Input id="name" name="name" label="Nome" value={nameValue} onChange={handleNameChange}/>
        <Textarea rows={5} cols={10} id="description" name="description" label="Descrizione" value={descriptionValue} onChange={handleDescriptionChange}/>
    </form>
}

export default AddEditActivity;
