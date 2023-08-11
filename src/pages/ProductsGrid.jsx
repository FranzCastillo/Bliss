import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard.jsx";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import LateralCart from "../components/LateralCart/LateralCart";
import { supabase } from "../supabase/client";
import PrimarySearchBar from "../components/PrimarySearchBar/PrimarySearchBar";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

const getCategories = async () => {
  const { data, error } = await supabase.from('categorias').select('id, categoria');

  if (error) {
    console.error('Error fetching categories:', error.message);
    return [];
  } else {
    return data.map(item => ({ id: item.id, categoria: item.categoria }));
  }
};

const ProductsGrid = ({ products }) => {
  const [names, setNames] = useState([]);
  const [category, setCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [securityLevel, setSecurityLevel] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCategories().then(categoriesNames => {
      setNames(categoriesNames);
    });
  }, []);

  useEffect(() => {
    async function getUserMail() {
      const userData = await supabase.auth.getUser();
      if (userData) {
        const { data, error } = await supabase
          .from("usuarios")
          .select("rol_id")
          .eq("email", userData.data.user.email);
        if (data) {
          setSecurityLevel(data[0].rol_id);
        }
        if (error) {
          console.log(error);
        }
      }
    }

    getUserMail();
  }, []);

  const isAdmin = securityLevel === 4;

  useEffect(() => {
    if (category === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  const handleSearch = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
  };

  const handleCategoryChange = event => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
  };

  return (
    <>
      <div className="principal" style={{ height: "100px", display: "flex" }}>
        {isAdmin && <FloatingButton />}
        <div className="secondary" style={{ width: "100%", display: "flex" }}>
          <Grid container spacing={2}>
            <Grid item xs={8} textAlign="left">
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
              <PrimarySearchBar search={search} handleSearch={handleSearch} />
            </Grid>
            <Grid item xs={1} marginTop="40px">
              <FormControl fullWidth>
                <InputLabel id="category-selection-label">Categoría</InputLabel>
                <Select
                  labelId="category-selection-label"
                  id="category-selection"
                  label="Categoría"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="">Todas las categorías</MenuItem>
                  {names.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.categoria}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {filteredProducts
              .filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase()) || product.category.includes(category)
              )
              .map(product => (
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
                  <ProductCard product={product} />
                </Grid>
              ))}

          </Grid>
        </div>
        <div className="third" style={{ width: "20%", display: "flex" }}>
          <LateralCart />
        </div>
      </div>
    </>
  );
};

ProductsGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProductsGrid;
