import HeaderComponet from '../components/Header-component';
function HomeView() {
    const title="Home";
return (
    <>
        
        <div>
        <HeaderComponet name={title}/>
            <div className="page-content">
                <div className="content">
                    <h1>Bienvenido</h1>
                </div>
            </div>
        </div>
    </>
);
}

export default HomeView;