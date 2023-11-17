import '../styles/grid.scss';
import { useState, useEffect } from "react";
import { Grid, FormControl, InputLabel, MenuItem, Select, Modal } from "@mui/material";
import ProductCard from "./ProductCard.jsx";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import LateralCart from "../components/LateralCart/LateralCart";
import PrimarySearchBar from "../components/PrimarySearchBar/PrimarySearchBar";
import PropTypes from "prop-types";
import {getCategories, getUserSecurityLevel} from "../supabase/supabaseUtils.js";
import {supabase} from "../supabase/client";
import { FetchProducts } from '../fetchProducts';
import LoadingIcon from '../../assets/icons/LoadingIcon.jsx'

/**
 * Products grid page
 * @returns ProductsGrid
 */
const ProductsGrid = () => {
    //Consts
    const [names, setNames] = useState([]);
    const [category, setCategory] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [securityLevel, setSecurityLevel] = useState();
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // Get categories
    useEffect(() => {
        setIsLoading(true)
        getCategories().then((categoriesNames) => {
            setNames(categoriesNames);
            setIsLoading(false)
        });
    }, []);

    // Fetch products
    useEffect(() => {
        async function fetchData() {
          setIsLoading(true)
          const fetchedData = await FetchProducts();
          setProducts(fetchedData);
          setIsLoading(false)
        }
        fetchData();
      }, []);

    // Get user security level
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
    
    // Filter products by category
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

            return (
                    <>
                    {/* Loading modal */}
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
                        <div
                            className="principal"
                            style={{height: "100px", display: "flex"}}
                        >
                            {isAdmin && <FloatingButton/>}
                            <div
                                className="secondary"
                                style={{width: "100%", display: "flex"}}
                            >
                                {/* Title, searchbar and category dropbox*/}
                                <Grid container spacing={2}>
                                    <Grid item xs={7} textAlign="left">
                                        <h1
                                            style={{
                                                marginLeft: "26px",
                                                marginBottom: "0px",
                                                marginTop: "40px",
                                                textAlign: "left",
                                                color: "#201b40",
                                            }}
                                        >
                                            Nuestros Productos
                                        </h1>
                                    </Grid>
                                    <Grid item xs={6} marginLeft="-25px" marginTop="15px" marginBottom="30px" className='textbox'>
                                        <PrimarySearchBar
                                            style={{backgroundColor: 'red !important'}}
                                            search={search}
                                            handleSearch={handleSearch}
                                        />
                                    </Grid>
                                    <Grid item xs={5} marginLeft="45px" marginTop="15px" marginBottom="30px" className='dropdown'>
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
                                                className='dropdown-container'
                                                style={{backgroundColor: 'white', width: '111%'}}
                                                
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
                                    
                                    {/* Products */}
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
                                                sm={2.6}
                                                key={product.id}
                                                marginLeft={3.7}
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

