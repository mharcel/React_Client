import React, {useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom';
import './styles.css';
import logoImage from '../../assets/library.png';
import {FiPower, FiEdit, FiTrash2} from 'react-icons/fi';
import api from "../../services/api";
import LoadingModal from "../loadingModal";

export default function Books(){
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState();
    const [page, setPage] = useState(0);
    const [books, setBooks] = useState([]);
    const userName = localStorage.getItem('userName')    
    const accessToken = localStorage.getItem('accessToken');

    const setLoadingModal = (isLoading, loadingMessage) => {
        setIsLoading(isLoading);
        setLoadingMessage(loadingMessage);
    }

    const authorization = {
        headers: {
            Authorization : `Bearer ${accessToken}`
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        fetchMoreBooks();
      }, [accessToken]);

    async function editBook(id){
        try {
            navigate(`/book/new/${id}`)
        } catch (error) {
            alert('Edit book failed!')
        }
    }

    async function deleteBook(id){
        try {
            const confirmed = window.confirm('Are you sure you want to proceed?');
            if(confirmed === false) return;
            await api.delete(`api/Book/v1/${id}`, authorization);

            setBooks(books.filter(book => book.id !== id))
        } catch (error) {
            alert('Delete Error!')
        }
    }

    async function logout(){
        try {
            setLoadingModal(true, "Logging Out...");
            await api.get('api/auth/v1/revoke', authorization);
            
            localStorage.clear();
            setLoadingModal(false);
            navigate('/');
        } catch (error) {
            alert('Logout Error!')
        }
    }

    async function fetchMoreBooks(){
        setLoadingModal(true, "Loading Books...");
        const response = await api.get(`api/Book/v1/asc/10/${page}`, authorization);
            setBooks([ ...books, ...response.data.list]);
            setPage(page + 1);
        setLoadingModal(false);
        }    

    return (
        <div className="book-container">
            {isLoading && <LoadingModal isLoading={isLoading} description={loadingMessage}/>}
            <header>
                <img src={logoImage} alt="Erudio"/>
                <span>Welcome, <strong>{userName.toUpperCase()}</strong></span>
                <Link className="button" to='/book/new/0'>Add New Book</Link>
                <button onClick={logout} type="button">
                    <FiPower size={18} color="#251FC5"/>
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>Title:</strong>
                        <p>{book.title}</p>
                        <strong>Author:</strong>
                        <p>{book.author}</p>
                        <strong>Price:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>                    
                        <strong>Release Date:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>
                        <div className="actionButtons">
                            <button onClick={() => editBook(book.id)} type="button">
                                <FiEdit size={20} color="#251FC5"/>
                            </button>                            
                            <button onClick={() => deleteBook(book.id)} type="button">
                                <FiTrash2 size={20} color="#251FC5"/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="button" onClick={fetchMoreBooks} type="button">Load More</button>
        </div>
    )
}