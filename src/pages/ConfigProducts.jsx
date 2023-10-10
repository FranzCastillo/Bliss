import React, {useState} from 'react'
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material'
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {supabase} from '../supabase/client';

function ConfigProducts({products}) {

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [code, setCode] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState(0)
    const [filename, setFilename] = useState('')
    const [file, setFile] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    const handleNewCategory = (event) => {
        setCategory(event.target.value)
        
    }


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
            console.log(error)
        }

    }

    async function handleNewSubmit(e) {
        e.preventDefault()

        const {data, error} = await supabase
            .storage
            .from('images')
            .upload('product_img/' + filename, file)
        if (data) {

            const image = filename.split('.')
            const {data, error} = await supabase
            .rpc('insertar_producto', {categoria_id: category, nombre: name, descripcion: desc, imagen: image[0], codigo: code})
            if (error) {
                console.log(error)
            }
            if (data) {
                relatePrice(data)
                relateDisponibility(data)
            }

        } else {
            console.log('insert')
            console.log(error)
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
                console.log('dispo')
                console.log(error)
            }
        } else {
            console.log(fail)
        }


    }

    const handleNewFilename = async (e) => {
        setFilename(e.target.files[0].name)
        setFile(e.target.files[0])


    }

    return (
        <Container component='main' maxWidth='xs'>
            <br></br>
            <Typography component="h1" variant="h5">
                Agregar Un Producto
            </Typography>
            <Box component="form" noValidate onSubmit={(e) => handleNewSubmit(e)} sx={{mt: 3}}>
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
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<UploadFileIcon/>}
                                sx={{marginRight: "1rem"}}
                                onChange={(e) => handleNewFilename(e)}
                            >
                                Subir Imagen
                                <input type="file" accept="image/png" hidden onChange={(e)=>handleImageChange(e)}/>
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Image Preview:
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
        </Container>
    )
}

export default ConfigProducts