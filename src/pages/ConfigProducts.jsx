import React, { useState } from 'react'
import { Container, Box, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import UploadFileIcon from "@mui/icons-material/UploadFile";

function ConfigProducts() {

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [code, setCode] = useState(0)
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState(0)
    const [filename, setFilename] = useState('')

    const handleCategory = (event) =>{
        setCategory(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        saveOrderInDB().then(r => navigate('/order-placed'));
    };

    const handleFilename = (e) =>{
        setFilename(e.target.files[0].name)
        console.log(e.target.files[0].name)
    }

    return (
        <Container component='main' maxWidth='xs'>
            <br></br>
            <Typography component="h1" variant="h5">
                Agregar Un Producto
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                <div className='new-prod' style={color}>
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
                                onChange={(event) => setID(event.target.value)}
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
                                    onChange={handleCategory}
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
                            startIcon={<UploadFileIcon />}
                            sx={{ marginRight: "1rem" }}
                        >
                            Subir Imagen
                            <input type="file" accept="image/png" hidden  />
                        </Button>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onChange={(e) => handleFilename(e)}
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