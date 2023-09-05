import {useEffect, useState} from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import ProductCard from "./ProductCard.jsx";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import LateralCart from "../components/LateralCart/LateralCart";
import PrimarySearchBar from "../components/PrimarySearchBar/PrimarySearchBar";
import PropTypes from "prop-types";
import {getCategories, getUserSecurityLevel} from "../supabase/supabaseUtils.js";
import {supabase} from "../supabase/client";
import { CircularProgress } from "@mui/material";

const ProductsGrid = ({products}) => {
    const [loading, setLoading] = useState(true);
    const [names, setNames] = useState([]);
    const [category, setCategory] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [securityLevel, setSecurityLevel] = useState();
    const [search, setSearch] = useState("");

    useEffect(() => {
        getCategories().then((categoriesNames) => {
            setNames(categoriesNames);
        });
    }, []);

    useEffect(() => {
        async function getUserMail() {
          const userData = await supabase.auth.getUser();
          if (userData) {
            const securityLevel = await getUserSecurityLevel(userData.data.user.email);
            if (securityLevel !== null) {
              setSecurityLevel(securityLevel);
            }
          }
        }
    
        getUserMail();
      }, []);
    
      const isAdmin = securityLevel === 4;
    
      useEffect(() => {
        if (category === "") {
          setFilteredProducts(products);
        } else {
          const filtered = products.filter(
            (product) => product.categoryId === category
          );
          setFilteredProducts(filtered);
        }
      }, [category, products]);


            const handleSearch = (event) => {
                const inputValue = event.target.value;
                setSearch(inputValue);
            };

            const handleCategoryChange = (event) => {
                const selectedCategory = event.target.value;
                setCategory(selectedCategory);
            };

            useEffect(() => {
                if (filteredProducts && names) {
                    setLoading(false);
                }
            }, [filteredProducts, names]);

            return (
                loading ? <CircularProgress/> :
                    <>
                        <div
                            className="principal"
                            style={{height: "100px", display: "flex"}}
                        >
                            {isAdmin && <FloatingButton/>}
                            <div
                                className="secondary"
                                style={{width: "100%", display: "flex"}}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={6} textAlign="left">
                                        <h1
                                            style={{
                                                marginLeft: "26px",
                                                marginBottom: "30px",
                                                marginTop: "40px",
                                                textAlign: "left",
                                                color: "#201b40",
                                            }}
                                        >
                                            Nuestros Productos
                                        </h1>
                                    </Grid>
                                    <Grid item xs={3} marginTop="40px">
                                        <PrimarySearchBar
                                            search={search}
                                            handleSearch={handleSearch}
                                        />
                                    </Grid>
                                    <Grid item xs={2} marginTop="40px">
                                        <FormControl fullWidth>
                                            <InputLabel id="category-selection-label">
                                                Categoría
                                            </InputLabel>
                                            <Select
                                                labelId="category-selection-label"
                                                id="category-selection"
                                                label="Categoría"
                                                value={category}
                                                onChange={handleCategoryChange}
                                                style={{backgroundColor: 'white'}}
                                            >
                                                <MenuItem value="">Todas las categorías</MenuItem>
                                                {names.map((category) => (
                                                    <MenuItem key={category.id} value={category.id}>
                                                        {category.categoria}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {filteredProducts
                                        .filter(
                                            (product) =>
                                                product.name.toLowerCase().includes(search.toLowerCase()) ||
                                                product.categoryId === category
                                        )
                                        .map((product) => (
                                            <Grid
                                                container
                                                direction="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                marginBottom={5}
                                                item
                                                xs={12}
                                                sm={3}
                                                key={product.id}
                                            >
                                                <ProductCard product={product}/>
                                            </Grid>
                                        ))}

                                </Grid>
                            </div>
                            <div
                                className="third"
                                style={{width: "20%", display: "flex"}}
                            >
                                <LateralCart/>
                            </div>
                        </div>
                    </>
            );
        }

        ProductsGrid.propTypes = {
            products: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    categoryId: PropTypes.number.isRequired,
                })
            ).isRequired,
        };

        export default ProductsGrid;

