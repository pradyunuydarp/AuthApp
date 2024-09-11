import '../CSS/Footer.css'
function Footer(){
    return(
        <footer className="Footer">
            <p>&copy; {new Date().getFullYear()} AuthApp</p>
        </footer>
    );
}
export default Footer