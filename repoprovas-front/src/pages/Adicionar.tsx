import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
} from "@mui/material";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";
import Form from "../components/Form";
import api, { Category, Disciplines } from "../services/api";
  
const styles = {
    container: {
      marginTop: "180px",
      width: "460px",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
    },
    title: { marginBottom: "30px" },
    dividerContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginTop: "16px",
      marginBottom: "26px",
    },
    input: { marginBottom: "16px" },
    actionsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
};

interface FormData {
    name: string;
    pdfUrl: string;
    categoryId: string;
    teacherId: string;
    disciplineId: string;
}
  
function Adicionar() {
    const { token } = useAuth();
    const { setMessage } = useAlert();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [disciplines, setDisciplines] = useState<Disciplines[]>([]);


    useEffect(() => {
        async function loadPage() {
          if (!token) return;
          
          const { data: categoriesData } = await api.getCategories(token);
          setCategories(categoriesData);
          const { data:disciplineData } = await api.getDisciplines(token);
          setDisciplines(disciplineData);
        }
        loadPage();
    }, [token]);

    const [formData, setFormData] = useState<FormData>({
      name: '',
      pdfUrl: '',
      categoryId: '',
      teacherId: '',
      disciplineId: ''
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMessage(null);
    
        if (!formData?.name || !formData?.pdfUrl || !formData?.categoryId || !formData?.teacherId) {
          setMessage({ type: "error", text: "Todos os campos são obrigatórios!" });
          return;
        }
    
        const testInfo = { 
            name: formData.name, 
            pdfUrl: formData.pdfUrl, 
            categoryId: parseInt(formData.categoryId), 
            teacherId: formData.teacherId
        };

        try {
            //await api.postTest(testInfo,token);
            //postTest(token);
            //navigate("/app/disciplinas");
          } catch (error: Error | AxiosError | any) {
            if (error.response) {
              setMessage({
                type: "error",
                text: error.response.data,
              });
              return;
            }
      
            setMessage({
              type: "error",
              text: "Erro, tente novamente em alguns segundos!",
            });
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Box sx={styles.container}>
                <Typography sx={styles.title} variant="h4" component="h1">
                Adicione uma prova
                </Typography>

                <TextField
                    name="name"
                    sx={styles.input}
                    label="Name"
                    type="text"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.name}
                />
                <TextField
                    name="pdfUrl"
                    sx={styles.input}
                    label="pdf url"
                    onChange={handleInputChange}
                    value={formData.pdfUrl}
                />
                <TextField
                    select
                    name="categoryId"
                    sx={styles.input}
                    label="Category"
                    onChange={handleInputChange}
                    value={formData.categoryId}
                >
                    { categories.map((category) => (
                        <MenuItem key={category.id} value={`${category.id}`}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    name="disciplineId"
                    sx={styles.input}
                    label="Discipĺine"
                    onChange={handleInputChange}
                    value={formData.disciplineId}
                >
                    {disciplines.map((query) => (
                        <MenuItem key={query.discipline.name} value={`${query.discipline.id}`}>
                            {query.discipline.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Box sx={styles.actionsContainer}>

                <Button variant="contained" type="submit">
                    Enviar
                </Button>
                </Box>
            </Box>
        </Form>
    );
}
  
export default Adicionar