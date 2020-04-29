const navbar = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
        <a className="navbar-brand" href="#">My Application</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <nav className="navbar-nav mr-auto">
                <a className="nav-item nav-link" href="#">Home</a>
                <a className="nav-item nav-link active" href="#">Workspace</a>
            </nav>
        </div>
    </nav>
);

module.exports = navbar;