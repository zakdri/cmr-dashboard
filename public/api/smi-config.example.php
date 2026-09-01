<?php

return [
    'moovapps_base_url' => 'http://localhost:8080',
    'moovapps_file_base_url' => 'http://localhost:8080/moovapps/portal',
    'ged_library_protocol_uri' => 'uri://vdoc/datastore/036-000002-000',
    'intranet_root_path' => 'Intranet CMR',
    'login' => 'sysadmin',
    'password' => 'CHANGE_ME',
    'timeout' => '500',
    'cache_enabled' => true,
    'cache_ttl_seconds' => 300,
    'cache_dir' => sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'cmr-dashboard-documents-cache',
];
