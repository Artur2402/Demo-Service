import axios from 'axios'
import { jsPDF } from 'jspdf'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { FaFilePdf } from 'react-icons/fa' // Импортируем иконку PDF
import { useNavigate, useParams } from 'react-router-dom'
import CompanyOverview from './CompanyOverview'
import ContactInfo from './ContactInfo'
import DirectorInfo from './DirectorInfo'
import MapSection from './MapSection'

// Функция для генерации PDF
const downloadPDF = company => {
	const doc = new jsPDF()
	doc.setFontSize(18)
	doc.text(company.name, 10, 10)
	doc.setFontSize(12)
	doc.text(`ИНН: ${company.inn}`, 10, 20)
	doc.text(`ОГРН: ${company.ogrn}`, 10, 30)
	doc.text(`Дата регистрации: ${company.registration_date}`, 10, 40)
	doc.text(`Статус: ${company.status}`, 10, 50)
	doc.text(`Адрес: ${company.address}`, 10, 60)
	doc.text(`Телефон: ${company.phone || 'Не указан'}`, 10, 70)
	doc.text(`Email: ${company.email || 'Не указан'}`, 10, 80)
	doc.text(`Директор: ${company.director}`, 10, 90)
	doc.save('company_details.pdf')
}

const CompanyDetails = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [company, setCompany] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchCompanyDetails = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/api/companies/${id}/`
				)
				setCompany(response.data)
				setLoading(false)
			} catch (err) {
				setError('Не удалось загрузить данные компании.')
				setLoading(false)
			}
		}
		fetchCompanyDetails()
	}, [id])

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				Загрузка...
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex justify-center items-center h-screen text-red-500'>
				{error}
			</div>
		)
	}

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<div className='flex justify-between items-center mb-4'>
				<button
					onClick={() => navigate(-1)}
					className='flex items-center text-blue-500 hover:text-blue-700'
				>
					<AiOutlineArrowLeft className='mr-2' />
					Назад
				</button>

				<button
					onClick={() => downloadPDF(company)} // Кнопка для PDF
					className='p-2 text-white bg-red-500 rounded-full hover:bg-red-600'
				>
					<FaFilePdf size={24} />
				</button>
			</div>

			<div className='bg-white shadow-md rounded-md p-6'>
				<h2 className='text-2xl font-bold mb-4'>{company.name}</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<CompanyOverview company={company} />
					<ContactInfo company={company} />
				</div>
				<DirectorInfo company={company} />
				{company.latitude && company.longitude && (
					<MapSection company={company} />
				)}
			</div>
		</div>
	)
}

export default CompanyDetails
