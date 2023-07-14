import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactQuill from 'react-quill';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
// import { AiOutlineRight } from "react-icons/ai";
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const modules = {
    toolbar: [
        [
            { header: [1, 2, 3, 4, 5, 6, false] }
        ],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "orderd" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
        ],
        ["link", "image"]
    ]
}

// { id: 1, name: "The importance of Establishing a strong Online Presence for small business", keyword: ["small business"] },
// { id: 2, name: "The importance of Establishing a strong Online Presence for small business", keyword: ["small business"] },
// { id: 3, name: "The importance of Establishing a strong Online Presence for small business", keyword: ["small business"] }

const Design = () => {
    const [topic, setTopic] = useState([
        { id: 1, name: "The importance of Establishing a strong Online Presence for small business", keyword: ["small business"] },
        { id: 2, name: "The importance of Establishing a strong Online Presence for small business", keyword: ["small business"] },
        { id: 3, name: "The importance of Establishing a strong Online Presence for small business", keyword: ["small business"] }
    ]);
    const [name, setName] = useState("");
    const [close, setClose] = useState(false);
    const [keyword, setkeyword] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [category, setCategory] = useState(true)
    const [activeTab, setActiveTab] = useState("custom");
    const [value, setValue] = useState("");
    const [selectedValue, setSelectedValue] = useState()
    var color = ['blue', 'green', 'yellow', 'pink', 'black']

    console.log("value data", value)
    const submit_handler = (e) => {
        let newArr = []
        for (let i = 0; i < topic.length; i++) {
            if (selectedValue.id === topic[i].id) {
                newArr.push({ ...topic[i], text: value })
            } else {
                newArr.push({ ...topic[i] })
            }
            setTopic(newArr)
        }
        setValue('')
        setClose(false);
    }
    const addTopic = () => {
        let splited = keyword.split(' ')
        let key = []
        for (let i = 0; i < splited.length; i++) {
            if (splited[i].length > 0) {
                key.push(splited[i])
            }
        }
        console.log(key)
        if (name.length > 0) {
            setTopic([...topic, { name, keyword: key, id: topic.length + 1 }]);
        }
        setShowInput(false);
    };
    const write_handler = (value) => {
        setSelectedValue(value)
        setValue(value?.text || '')
        setClose(true);
    };
    const showTopic = () => {
        setShowInput(true);
    };
    const delete_handler = (id) => {
        setTopic((oldItems) => {
            return oldItems.filter((arr, i) => {
                return i !== id
            })
        })
        setClose(false);
    };
    const category_handler = (name) => {
        setCategory(false)
        setActiveTab(name)
    }
    console.log(topic)
    const showCustomData = (name) => {
        setCategory(true);
        setActiveTab(name)
    }
    return (
        <div className="container">
            <div className="sub-container">
                <p className="cate">category</p>
                <div className="category">
                    <div className="category-name">
                        <p className={activeTab === "all" ? "active " : ""} onClick={() => category_handler("all")} >All</p>
                        <p className={activeTab === "custom" ? "active " : ""} onClick={() => showCustomData("custom")}>Custom </p>
                        <p className={activeTab === "icp" ? "active " : ""} onClick={() => category_handler("icp")} >ICP</p>
                        <p className={activeTab === "Mission" ? "active" : ""} onClick={() => category_handler("Mission")} >Mission</p>
                        <p className={activeTab === "Product" ? "active " : ""} onClick={() => category_handler("Product")} >Product</p>
                        <button className="topic-add-button" onClick={showTopic}>
                            Add Topic
                        </button>
                    </div>
                    <div className="add-topic-button">
                        {showCustomData && showInput ? (
                            <div className="add-topic-field">
                                <input
                                    placeholder="Enter a Topic.."
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    placeholder="Enter a keyword.."
                                    onChange={(e) => setkeyword(e.target.value)}
                                />
                                <button className="topic-add-button" onClick={addTopic}>
                                    Add Data
                                </button>
                            </div>
                        ) : ("")}
                    </div>
                </div>
                <h4 className='recom'>Recommended Topics</h4>
                <div className="topic-name">
                    {category ? topic.map((item, i) => {
                        return (
                            <div key={i} className="topic-sub-con">
                                <div className="sub-topic" >
                                    <p className="data" onClick={() => write_handler(item)}>
                                        {item.name}<br /><br />
                                        {item.keyword.map((val, ind) => {
                                            return (
                                                <b className="topic-css" style={{ 'color': color[ind], 'border-color': color[ind], 'backgroundColor': `lighten(${color[ind]}, 20%)` }}>{val}</b>
                                            )
                                        })}
                                    </p>
                                    <button className="delete-btn" onClick={() => delete_handler(i)}>
                                        <DeleteIcon />
                                    </button>
                                    <button className="topic-add-button" onClick={() => write_handler(item)}>
                                        Write
                                    </button>
                                </div>
                                {(close && item.id === selectedValue.id) ? (
                                    <>
                                        <div className="box-edit" >
                                            <div>
                                                <ReactQuill theme="snow" value={value} onChange={setValue}
                                                    className='editor-input'
                                                    modules={modules} />
                                            </div>
                                            <button onClick={submit_handler} className="submit" >submit</button>
                                        </div>
                                        <div>
                                            <button className="close-btn"
                                                onClick={() => setClose(false)} >close</button>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                            </div>
                        );
                    }) : <><div className="next_page">
                            <h1> There is no data ? <br /> All data is Custom page</h1>
                    </div></>}
                </div>
            </div>
        </div>
    );
}

export default Design;
