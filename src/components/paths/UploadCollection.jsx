import React, { useEffect, useState } from 'react'
import { database, firestore, storage } from '../../firebase';
import { SET_ITEM } from '../../redux/actionTypes';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import uuid from 'react-uuid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function UploadCollection() {
    const [collections, setCollections] = useState({});
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [product, setProduct] = useState("");
    const [inputStateOne, setStateOne] = useState("");
    const [inputStateTwo, setStateTwo] = useState("");
    const [inputStateThree, setStateThree] = useState("");
    const [item, setItem] = useState("");
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    let [error, setError] = useState("");
    const [files, setFiles] = useState([]); 
    const [noOfImages, setNoOfImages] = useState("1");
    const navigate = useNavigate();
    const [checkBox, setCheckBox] = useState([false, false, false, false]);
    const [checkBoxForColors, setCheckBoxForColors] = useState([false, false, false, false]);
    const [sizes, setSizes] = useState(["32", "34", "36", "38"]);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [colors, setColors] = useState(["black", "blue", "red", "white"]);
    const [availableColors, setAvailableColors] = useState([]);
    const [ids, setIds] = useState(["name", "price", "offerPrice", "condition", "availability", "giftWrapping", "shipping"]);
    const [allStates, setAllStates] = useState(["", "", "", "", "", "", ""]);
    const [descriptionPair, setDescriptionPair] = useState(["", ""]);
    const [description, setDescription] = useState({});
    const [countOfImages,setCountOfImages] = useState(0);

    const setInputStateOne = (e) => {
        let val = e.target.value.trim();
        setStateOne(val);
        let isPresent = categories.find((values) => {
            return val == values
        });
        // console.log(isPresent);
        if (isPresent != undefined) {
            setCategory(val);
        }
    }
    const setInputStateTwo = (e) => {
        let val = e.target.value.trim();
        setStateTwo(val);
        let isPresent = subCategories.find((values) => {
            return val == values
        });
        if (isPresent != undefined) {
            setSubCategory(val);
        }
    }
    const setInputStateThree = (e) => {
        let val = e.target.value.trim();
        setStateThree(val);
        let isPresent = products.find((values) => {
            return val == values
        });
        if (isPresent != undefined) {
            setProduct(val);
        }
    }
    useEffect(function () {
        if (category != "") {
            let arr = [];
            let data = collections[category];
            // console.log(Object.keys(data));
            setSubCategories(Object.keys(data));
        }
    }, [category]);
    useEffect(function () {
        if (subCategory != "") {
            // let arr = [];
            let data = collections[category][subCategory];
            // console.log(data);
            setProducts(Object.keys(data));
        }
    }, [subCategory]);
    useEffect(function () {
        // let arr=[];
        if (product.length > 0) {
            let data = collections[category][subCategory];
            let dataObj = Object.keys(data);
            let index = dataObj.findIndex((element) => {
                return element == product
            })
            if (index != -1) {
                setItem(data[index])
            }
        }
    }, [product]);
    useEffect(async () => {
        let data = {};
        data = await database.collections.get()
        data.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            data = doc.data();
            setCollections(data);
            setCategories(Object.keys(data));
            setLoading(false);
        });
    }, [])
    // useEffect(()=>{
    //     if(category!="")
    // })
    const finalSubmit = () => {
        try {
            if (category.length>0 && subCategory.length>0 && product.length>0 && files.length == noOfImages && countOfImages== noOfImages) {
                setLoading(true);
                firestore.collection(product).add({
                    "name": allStates[0],
                    "imageUrls": files, 
                    "description": description,
                    "availableSizes": availableSizes,
                    "availableColors": availableColors,
                    "condition": allStates[3],
                    "availability": allStates[4],
                    "giftWrapping": allStates[5],
                    "shipping": allStates[6],
                    "price": allStates[1],
                    "offerPrice": allStates[2]
                }).then(async (docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    let docId = "";
                    database.collections.get().then((dataObj)=>{
                        dataObj.forEach(async(doc) => {
                            docId = doc.id;
                            console.log(docId);
                            let data=doc.data();
                            //push(docRef.id)
                            console.log(data);
                            let oldArr=data[category][subCategory][product];
                            let newArr=[...oldArr,docRef.id];
                            console.log(newArr);
                            data[category][subCategory][product]=newArr;
                            let dataRef=database.collections.doc(`${docId}`);
                            return dataRef.update(data).then(()=>{
                                console.log("document updated successfully")
                            });
                        });
                    })
                    
                })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                // kam krna hai
                setStateOne("");
                setStateTwo("");
                setStateThree("");
                setLoading(false);
                navigate('/adminonly');
            }
            else{
                console.log(noOfImages,countOfImages,files,product);
            }
            // id=uuid();
        }
        catch (err) {
            setError(err);
            setLoading(false);
        }
    }
    const Input = styled('input')({
        display: 'none',
    });
    const handleFileUpload = (e) => {
        if (countOfImages < noOfImages) {
            let file = e.target.files[0];
            console.log(file);
            // setFileOne(file);
            let id = uuid();
            try {
                setUploading(true);
                let uploadTaskListner = storage.ref(`/${category}/${subCategory}/${product}/${id}`).put(file);
                uploadTaskListner.on('state_changed', f1, f2, f3);
                function f1(snapshot) {
                    console.log("hello");
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }
                function f2(err) {
                    setError(err);
                }
                async function f3() {
                    let fileUrl = await uploadTaskListner.snapshot.ref.getDownloadURL();
                    console.log('File available at', fileUrl);
                    setCountOfImages(countOfImages + 1);
                    let oldFiles = [...files,fileUrl];
                    // let newFiles = oldFiles.push(fileUrl);
                    setFiles(oldFiles);
                    console.log(oldFiles,files);
                    setUploading(false);
                    // props.history.push('/');
                }

            } catch (err) {
                setError(err);
                setUploading(false);
            }
        }
        else{
            console.log("Can,t Upload the image");
        }
    }
    const changeisChecked = (e, index) => {
        let checkTemp = checkBox;
        console.log(e.target.checked);
        checkTemp[index] = e.target.checked;
        setCheckBox([...checkTemp]);
    }
    const changeisCheckedForColors = (e, index) => {
        let checkTemp = checkBoxForColors;
        console.log(e.target.checked);
        checkTemp[index] = e.target.checked;
        setCheckBoxForColors([...checkTemp]);
    }
    const getCheckedSizes = (e) => {
        e.preventDefault();
        let values = checkBox.map((checkedBoolValue, index) => {
            if (checkedBoolValue == true) {
                return sizes[index]
            }
            else {
                return "";
            }
        })
        console.log(values);
        setCheckBox([false, false, false, false])
        setAvailableSizes(values);
    }
    const getCheckedColors = (e) => {
        e.preventDefault();
        let values = checkBoxForColors.map((checkedBoolValue, index) => {
            if (checkedBoolValue == true) {
                return colors[index]
            }
            else {
                return "";
            }
        })
        console.log(values);
        setCheckBox([false, false, false, false])
        setAvailableColors(values);
    }
    const addDataToDescription = (e) => {
        e.preventDefault();
        if (descriptionPair[0].length > 0 && descriptionPair[1].length > 0) {
            let tempObj = description;
            let newObj = { ...tempObj, [descriptionPair[0]]: descriptionPair[1] };
            setDescription(newObj);
            setDescriptionPair(["",""]);
        }
    }
    // console.log(users);
    return (
        loading ? <>Loading...</> :
            <div>
                <div style={{ fontWeight: "bold" }}>
                    Choose Category
                </div>
                <input value={inputStateOne} onChange={setInputStateOne} style={{ height: "2rem" }} placeholder="Select a category:Love, career, more" list="categories" autoComplete="off" name="browser" id="browser" />
                <datalist id="categories">
                    {categories.map(function (question) {
                        return (<option value={question} />);
                    })}
                </datalist>
                <div style={{ fontWeight: "bold" }}>
                    Choose SubCategory
                </div>
                <input value={inputStateTwo} onChange={setInputStateTwo} style={{ height: "2rem" }} placeholder="Select a category:Love, career, more" list="subcategories" autoComplete="off" name="browser" id="browser" />
                <datalist id="subcategories">
                    {subCategories.map(function (question) {
                        return (<option value={question} />);
                    })}
                </datalist>
                <div style={{ fontWeight: "bold" }}>
                    Choose Product
                </div>
                <input value={inputStateThree} onChange={setInputStateThree} style={{ height: "2rem" }} placeholder="Select a category:Love, career, more" list="products" autoComplete="off" name="browser" id="browser" />
                <datalist id="products">
                    {products.map(function (question) {
                        return (<option value={question} />);
                    })}
                </datalist>
                <div style={{padding: "20px"}}> 
                <TextField
                    value={noOfImages}
                    onChangeCapture={(e) => {
                        let value = e.target.value;
                        setNoOfImages(value);
                    }}
                    sx={{color:"red"}}
                    type="number"
                    className="input_field"
                    InputProps={{
                        inputProps: {
                            max: 10, min: 1
                        }
                    }}
                    label="Images Count"
                />

                <label htmlFor="contained-button-file">
                    <Input accept="file" id="contained-button-file" multiple type="file" onChange={(e) => {
                        handleFileUpload(e);
                    }} />
                    <Button color="secondary" endIcon={<CloudUploadIcon></CloudUploadIcon>} variant="contained" component="span">
                        Upload
                    </Button>
                </label>
                </div>
                <div style={{display:"flex"}}>
                <form type="submit" onSubmit={(e) => { getCheckedSizes(e) }}>
                    {sizes.map((sizeVal, index) => {
                        return (
                            <div> <input type="checkbox" id="`size${sizes[index]}`" name="size" checked={checkBox[index]} onChange={(e) => { changeisChecked(e, index) }} value={sizes[index]} checked={checkBox[index]} />
                                <label for="`size${sizes[index]}`" >{sizeVal}</label><br /></div>
                        )
                    })}
                    <input type="submit" value="Add Sizes" />
                </form>
                <form type="submit" onSubmit={(e) => { getCheckedColors(e) }}>
                    {colors.map((sizeVal, index) => {
                        return (
                            <div> <input type="checkbox" id="`color${sizes[index]}`" name="size" checked={checkBoxForColors[index]} onChange={(e) => { changeisCheckedForColors(e, index) }} value={colors[index]} checked={checkBoxForColors[index]} />
                                <label for="`color${sizes[index]}`" >{sizeVal}</label><br /></div>
                        )
                    })}
                    <input type="submit" value="Add Colors" />
                </form>
                </div>
                <div>
                    {ids.map((id, index) => {
                        return (
                            <div className="flex_all">
                                <label for={id}>{id}</label>
                                <input onChange={(e) => {
                                    let tempStates = [...allStates];
                                    tempStates[index] = e.target.value;
                                    setAllStates(tempStates);
                                }} value={allStates[index]} id={id} type="text" />
                            </div>
                        )
                    })}
                </div>
                <form type="submit" onSubmit={(e) => { addDataToDescription(e) }}>
                <div style={{display:"flex",justifyContent:"center"}}>

                    <label for="key">key</label>
                    <input id="key" value={descriptionPair[0]} onChange={(e) => {
                        // let tempPair=descriptionPair;
                        // tempPair[0]=e.target.value;
                        setDescriptionPair([e.target.value, descriptionPair[1]]);
                    }} type="text" />
                    <label style={{marginLeft: "6rem"}} for="value">value</label>
                    <input id="value" value={descriptionPair[1]} onChange={(e) => {
                        // let tempPair=descriptionPair;
                        // tempPair[1]=e.target.value;
                        // console.log(tempPair,descriptionPair[1]);
                        setDescriptionPair([descriptionPair[0], e.target.value]);
                    }} type="text" />
                    </div>

                    <div style={{display:"flex",justifyContent:"center"}}>
                    <input type="submit" value="Add To Description" />
                    </div>
                </form>
                <div style={{display:"flex",justifyContent:"center"}}>
                <button style={{backgroundColor: "#ff9191"}} onClick={finalSubmit}>ADD YOUR ITEM TO COLLECTION</button>
                </div>

            </div>
    )
}

export default UploadCollection
