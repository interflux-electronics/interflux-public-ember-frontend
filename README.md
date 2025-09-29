# The main website of Interflux Electronics

This codebase is the Ember app which runs the frontend of [https://interflux.com](interflux.com) for the company Interflux Electronics.

## Development

Install:

```sh
nvm install
yarn install
```

Serve:

```sh
ember serve
open http://localhost:4200
open http://localhost:4200/tests
```

Generate code:

```sh
ember help generate
```

Testing:

```sh
ember test
ember test --server
```

Linting:

```sh
yarn lint
yarn lint:fix
```

Building:

```sh
ember build
ember build --environment production
```

## Production

Spin up Nginx:

```sh
sudo ln -s /var/www/interflux.com/nginx/interflux.com.conf /etc/nginx/sites-enabled/
sudo nginx -T
sudo systemctl restart nginx
sudo systemctl status nginx
```

Run Ember Fastboot:

```sh
cd /var/www/interflux.com
node fastboot.js
```

Run Ember Fastboot in the background:

```sh
cd /etc/systemd/system/
sudo ln -s /var/www/interflux.com/systemd/interflux.com.fastboot.service
sudo systemctl enable interflux.com.fastboot.service
sudo systemctl daemon-reload
sudo systemctl start interflux.com.fastboot.service
```

Rotate log files:

```sh
cd /etc/logrotate.d/
cp /var/www/interflux.com/logrotate/interflux.com.logs

# debug (optional)
sudo logrotate -d interflux.com.logs

# force (optional)
sudo logrotate -f interflux.com.logs
```