#!/bin/sh

ADMIN_ROLE=$REACT_APP_ADMIN_ROLE
OUTPUTS=$REACT_APP_OUTPUTS
INPUTS=$REACT_APP_INPUTS
SALES=$REACT_APP_SALES
IOUT=$REACT_APP_IOUT
SOUT=$REACT_APP_SOUT
SIOUT=$REACT_APP_SIOUT

echo "window._env_ = {" > /usr/share/nginx/html/env-config.js
echo "REACT_APP_ADMIN_ROLE: \"$ADMIN_ROLE\"," >> /usr/share/nginx/html/env-config.js
echo "REACT_APP_OUTPUTS: \"$OUTPUTS\"," >> /usr/share/nginx/html/env-config.js
echo "REACT_APP_INPUTS: \"$INPUTS\"," >> /usr/share/nginx/html/env-config.js
echo "REACT_APP_SALES: \"$SALES\"," >> /usr/share/nginx/html/env-config.js
echo "REACT_APP_IOUT: \"$IOUT\"," >> /usr/share/nginx/html/env-config.js
echo "REACT_APP_SOUT: \"$SOUT\"," >> /usr/share/nginx/html/env-config.js
echo "REACT_APP_SIOUT: \"$SIOUT\"," >> /usr/share/nginx/html/env-config.js
"};" >> /usr/share/nginx/html/env-config.js

exec nginx -g "daemon off;"
