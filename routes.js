

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            return res.view('index');
        }
    },
    {
        method: 'GET',
        path: '/about',
        handler: (req, res) => {
            return 'About Page';
        }
    },

    // Static Folders
    {
        method: 'GET',
        path: '/{params*}',
        handler: {
            directory: {
                path: ['public/js', 'public/css']
            }
        }
    }
];


module.exports = routes;