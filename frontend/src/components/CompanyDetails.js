import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const CompanyDetails = () => {
	const { id } = useParams();
	const [company, setCompany] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get(`http://127.0.0.1:8000/api/companies/${id}/`)
		.then(response => {
			setCompany(response.data)
			setLoading(false)
		})
		.catch(error => {
			console.error('Ошибка при загрузке данных:', error)
			setLoading(false)
		})
	}, [id])

	if (loading) {
		return <Typography>Загрузка данных...</Typography>
	}

	if (!company) {
		return <Typography>Компания не найдена.</Typography>
	}

	return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Детали компании
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>ИНН</TableCell>
              <TableCell>{company.inn}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ОГРН</TableCell>
              <TableCell>{company.ogrn}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>{company.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Адрес</TableCell>
              <TableCell>{company.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Руководитель</TableCell>
              <TableCell>{company.director}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Вид деятельности</TableCell>
              <TableCell>{company.activity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Дата регистрации</TableCell>
              <TableCell>{company.registration_date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Статус</TableCell>
              <TableCell>{company.status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CompanyDetails