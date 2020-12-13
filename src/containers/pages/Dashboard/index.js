import React, {Fragment, useState, useEffect} from "react";
import { connect } from "react-redux";
import { addNotesToAPI, getAllNotes, editNoteToAPI, deleteNoteToAPI } from "./../../../config/redux/action"; 
import { Button } from "./../../../components/atoms";
import Note from "./../../../components/moleculs/Note";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function Dashboard ({saveNotes, getNotes, notes, editNote, deleteNotes}) {
    const history = useHistory()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [action, setAction] = useState("Add");
    const [noteId, setNoteId] = useState("");
    const date = new Date().getTime();
    const userData = JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{
        if(userData === null || undefined){
            history.push("/SignIn")
        } else {
            getNotes(userData.uid);
        }
    }, [])

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }
    const changeDescription = (e) => {
        setDescription(e.target.value);
    }
    const _saveNotes = () => {
        const data = {
            title : title,
            description : description,
            date : date,
            userId : userData.uid,
        }
        saveNotes(data);
        setTitle("")
        setDescription("")
    }
    const _editNotes = () => {
        const data = {
            title : title,
            description : description,
            date : date,
            userId : userData.uid,
            noteId : noteId,
        }
        editNote(data);
        setTitle("");
        setDescription("");
        setAction("Add")
    }
    const clickNotes = ({title, description, id}) => {
        setTitle(title);
        setDescription(description);
        setAction("Edit");
        setNoteId(id);
    }
    const clickCancel = () => {
        setTitle("");
        setDescription("");
        setAction("Add");
    }
    const deleteNote = (e, noteId) => {
        e.stopPropagation();
        const data = {
            userId : userData.uid,
            noteId : noteId,
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteNotes(data);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
    return (
        <div className="dashboard">
            <div className="main">
                <div className="addNote">
                    <p className="title">{action} Note</p>
                    <input className="title-note" placeholder="Title" value={title} onChange={changeTitle} />
                    <textarea className="description-note" placeholder="Description" value={description} onChange={changeDescription} ></textarea>
                    <div className="button">
                        {
                            action === "Add" ? <Button text="Add Note" background="bg-primary" action={_saveNotes} /> : null
                        }
                        {
                            action === "Edit" ? <Button text="Edit Note" background="bg-primary" action={()=>_editNotes()} /> : null
                        }
                        <Button text="Cancel" action={clickCancel} />
                    </div>
                </div>
                <br></br>
                <div className="MyNotes">
                    <h3 className="text-primary">My Notes</h3>
                    <Fragment>
                        {
                            notes.map((note)=>{
                                const id = note[0];
                                const { title, date, description } = note[1];
                                return (
                                    <Note title={title} date={date} description={description} key={id} action={()=>clickNotes({title, date, description, id})} deleteAction={(e)=>deleteNote(e, id)} />
                                )
                            })
                        }
                    </Fragment>
                </div>
                <br></br>
                <p>&copy;Copyright Raihan Adi Nugroho</p>
                <br></br>
            </div>
        </div>
        
    )
}

const mapStateToProps = (state) => {
    return {
        userData    : state.user,
        notes       :  state.notes,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveNotes   : (data) => dispatch(addNotesToAPI(data)),
        getNotes    : (id)   => dispatch(getAllNotes(id)),
        editNote    : (data) => dispatch(editNoteToAPI(data)),
        deleteNotes : (data) => dispatch(deleteNoteToAPI(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);