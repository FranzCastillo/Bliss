import React, {useState} from 'react'
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography
} from '@mui/material'
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {supabase} from '../supabase/client';
import Swal from 'sweetalert2';
import {v4} from 'uuid'
import LoadingIcon from '../../assets/icons/LoadingIcon.jsx'

function ConfigProducts({products}) {

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [code, setCode] = useState('')
    const [codedel, setCodedel] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState(0)
    const [filename, setFilename] = useState('')
    const [file, setFile] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const raiseErrorAlert = (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
        })
    }


    const handleNewCategory = (event) => {
        setCategory(event.target.value)
        
    }

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleDelcode = (event) =>{
        const pcode = event.target.value;
        setCodedel(pcode);
    }

    const handleNewSizes = (event) => {
        setSelectedOptions(event.target.value);
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
        }
    }


    async function relatePrice(id) {
        const {error} = await supabase
            .from('precio_del_producto')
            .insert({producto_id: id, precio: price})

        if (error) {
            raiseErrorAlert(error.message)
        }

    }

    async function handleNewSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        if (filename === '' || !file) {
            raiseErrorAlert('Por favor, suba una imagen')
            return
        }

        const uid = v4()

        const fileParts = filename.split('.')

        const parsedImageName = fileParts[0] + "_" + uid

        const parsedImageNameMime = parsedImageName + "." + fileParts[1]

        const {data, error} = await supabase
            .storage
            .from('images')
            .upload('product_img/' + parsedImageNameMime , file)
        if (data) {

            const {data, error} = await supabase
            .rpc('insertar_producto', {categoria_id: category, nombre: name, descripcion: desc, imagen: parsedImageName, codigo: code})
            if (error) {
                raiseErrorAlert(error.message)
            }
            if (data) {
                relatePrice(data).then(()=>{
                    relateDisponibility(data).then(()=>{
                        setIsLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Producto agregado',
                            confirmButtonText: 'Ok',
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }else{
                                window.location.reload();
                            }
                        })
                    })
                })
            }

        } else {
            raiseErrorAlert(error.message)
            setIsLoading(false)
        }
    }

    function handleDelete(e){
        setIsLoading(true)
        e.preventDefault()
        products.forEach((prod) =>{
            if (codedel != ''){
                if (prod.code == codedel){
                    const id = prod.id
                    Delete(id,1)
                    Delete(id,2)
                    Delete(id,3)
                    Delete(id,4)
                    
                    setTimeout(() => {
                        Delete(id,5)
                        setIsLoading(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Producto eliminado',
                            confirmButtonText: 'Ok',
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }else{
                                window.location.reload();
                            }
                        })
                    }, 2000)
                }
            }
        })
        
    }

    async function Delete(prodid,table){
        if(table == 1){
            const { error } = await supabase
            .from('disponibilidad_de_producto')
            .delete()
            .eq('producto_id', prodid)

            if(error){
                console.log(error)
            }
        }
        if(table == 2){
            const { error } = await supabase
            .from('precio_del_producto')
            .delete()
            .eq('producto_id', prodid)

            if(error){
                console.log(error)
            }
        }
        if(table == 3){
            const { error } = await supabase
            .from('productos_del_pedido')
            .delete()
            .eq('producto_id', prodid)

            if(error){
                console.log(error)
            }
        }
        if(table == 4){
            const { error } = await supabase
            .from('productos_en_carrito')
            .delete()
            .eq('producto_id', prodid)

            if(error){
                console.log(error)
            }
        }
        if(table == 5){
            const { error } = await supabase
            .from('producto')
            .delete()
            .eq('id', prodid)

            if(error){
                console.log(error)
            }
        }
    }


    async function relateDisponibility(id) {
        const {data, fail} = await supabase
            .from('disponibilidad_de_producto')
            .select()

        if (data) {
            const talla = Math.floor(Math.random() * (44 - 39 + 1) + 39);
            const {error} = await supabase
                .from('disponibilidad_de_producto')
                .insert({producto_id: id, cantidad: 100, talla: talla})

            if (error) {
                raiseErrorAlert(error.message)
            }
        } else {
            raiseErrorAlert(fail.message)
        }


    }

    const handleNewFilename = async (e) => {
        setFilename(e.target.files[0].name)
        setFile(e.target.files[0])


    }

    return (
        <Container component='main' maxWidth='xs'>
            <Modal 
                open={isLoading}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <LoadingIcon width="100px"/>
            </Modal>
            
            <br></br>
            <Typography component="h1" variant="h5">
                Agregar Un Producto
            </Typography>
            <Box component="form" onSubmit={(e) => handleNewSubmit(e)} sx={{mt: 3}}>
                <div className='new-prod'>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Nombre: "
                                name="name"
                                onChange={(event) => setName(event.target.value)}
                                value={name}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                id="desc"
                                label="Descripción: "
                                name="desc"
                                onChange={(event) => setDesc(event.target.value)}
                                value={desc}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                id="code"
                                label="Código: "
                                name="code"
                                onChange={(event) => setCode(event.target.value)}
                                value={code}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                id="price"
                                label="Precio: "
                                name="price"
                                onChange={(event) => setPrice(event.target.value)}
                                value={price}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Q</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    value={category}
                                    label="Categoría"
                                    onChange={handleNewCategory}
                                    required
                                >
                                    <MenuItem value={1}>Dama</MenuItem>
                                    <MenuItem value={2}>Caballero</MenuItem>
                                    <MenuItem value={3}>Niño</MenuItem>
                                    <MenuItem value={4}>Niña</MenuItem>
                                    <MenuItem value={5}>Juvenil</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel id="demo-simple-select-label">Tallas</InputLabel>
                                <Select
                                    labelId="size-label"
                                    id="size"
                                    multiple
                                    value={selectedOptions}
                                    label="Tallas"
                                    onChange={handleNewSizes}
                                    required
                                >
                                    <MenuItem value={1}>30</MenuItem>
                                    <MenuItem value={2}>31</MenuItem>
                                    <MenuItem value={3}>32</MenuItem>
                                    <MenuItem value={4}>33</MenuItem>
                                    <MenuItem value={5}>34</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<UploadFileIcon/>}
                                sx={{marginRight: "1rem"}}
                                onChange={(e) => handleNewFilename(e)}
                            >
                                Subir Imagen
                                <input type="file" accept="image/png" hidden onChange={(e)=>handleImageChange(e)} />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Previsualización de la imagen:
                            </Typography>
                            {selectedImage && <img src={selectedImage} alt="" width="50%"/>}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Agregar Producto
                    </Button>
                </div>
            </Box>
            <br></br>
             <Typography component="h1" variant="h5">
                Eliminar Un Producto
            </Typography>
            <Box component="form" onSubmit={(e) => handleDelete(e)} sx={{mt: 3}}>
                <div>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="delcode-selection-label">
                                    Código
                                </InputLabel>
                                <Select
                                    labelId="delcode-selection-label"
                                    id="delcode-selection"
                                    label="Código"
                                    value={codedel}
                                    onChange={handleDelcode}
                                    required
                                    >
                                    {products.map((product) => (
                                        <MenuItem key={product.code} value={product.code}>
                                            {product.code}
                                        </MenuItem>
                                    ))}
                                    </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Eliminar Producto
                    </Button>
                </div>
            </Box>
        </Container>
    )
}

export default ConfigProducts