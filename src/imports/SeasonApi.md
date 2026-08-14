# SeasonApi

All URIs are relative to *https://footballanalysisapi-gucjcmcrf7acafej.southafricanorth-01.azurewebsites.net*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiSeasonAllGet**](#apiseasonallget) | **GET** /api/Season/all | |
|[**apiSeasonCreatePost**](#apiseasoncreatepost) | **POST** /api/Season/create | |
|[**apiSeasonDeletePost**](#apiseasondeletepost) | **POST** /api/Season/delete | |
|[**apiSeasonIdGet**](#apiseasonidget) | **GET** /api/Season/{id} | |
|[**apiSeasonIdLeadersGet**](#apiseasonidleadersget) | **GET** /api/Season/{id}/leaders | |
|[**apiSeasonIdMatchesGet**](#apiseasonidmatchesget) | **GET** /api/Season/{id}/matches | |
|[**apiSeasonIdPlayersGet**](#apiseasonidplayersget) | **GET** /api/Season/{id}/players | |
|[**apiSeasonIdStatisticsGet**](#apiseasonidstatisticsget) | **GET** /api/Season/{id}/statistics | |
|[**apiSeasonIdTeamsGet**](#apiseasonidteamsget) | **GET** /api/Season/{id}/teams | |
|[**apiSeasonUpdatePut**](#apiseasonupdateput) | **PUT** /api/Season/update | |

# **apiSeasonAllGet**
> Array<GetSeasonDTO> apiSeasonAllGet()


### Example

```typescript
import {
    SeasonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeasonApi(configuration);

const { status, data } = await apiInstance.apiSeasonAllGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<GetSeasonDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSeasonCreatePost**
> GetSeasonDTO apiSeasonCreatePost(createSeasonDTO)


### Example

```typescript
import {
    SeasonApi,
    Configuration,
    CreateSeasonDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new SeasonApi(configuration);

let createSeasonDTO: CreateSeasonDTO; //

const { status, data } = await apiInstance.apiSeasonCreatePost(
    createSeasonDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSeasonDTO** | **CreateSeasonDTO**|  | |


### Return type

**GetSeasonDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSeasonDeletePost**
> apiSeasonDeletePost()


### Example

```typescript
import {
    SeasonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeasonApi(configuration);

let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiSeasonDeletePost(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSeasonIdGet**
> GetSeasonDTO apiSeasonIdGet()


### Example

```typescript
import {
    SeasonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeasonApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSeasonIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetSeasonDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSeasonIdLeadersGet**
> Array<PlayerLeaderDTO> apiSeasonIdLeadersGet()


### Example

```typescript
import {
    SeasonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeasonApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSeasonIdLeadersGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Array<PlayerLeaderDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSeasonIdMatchesGet**
> Array<GetMatchDTO> apiSeasonIdMatchesGet()


### Example

```typescript
import {
    SeasonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeasonApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSeasonIdMatchesGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Array<GetMatchDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSeasonIdPlayersGet**
> Array<GetPlayerDTO> apiSeasonIdPlayersGet()


### Example

```typescript
import {
    SeasonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeasonApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSeasonIdPlayersGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Array<GetPlayerDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSeasonIdStatisticsGet**
> GetSeasonStatisticsDTO apiSeasonIdStatisticsGet()


### Example

```typescript
import {
    SeasonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeasonApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSeasonIdStatisticsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetSeasonStatisticsDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSeasonIdTeamsGet**
> Array<GetTeamDTO> apiSeasonIdTeamsGet()


### Example

```typescript
import {
    SeasonApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeasonApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSeasonIdTeamsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Array<GetTeamDTO>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSeasonUpdatePut**
> GetSeasonDTO apiSeasonUpdatePut(updateSeasonDTO)


### Example

```typescript
import {
    SeasonApi,
    Configuration,
    UpdateSeasonDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new SeasonApi(configuration);

let updateSeasonDTO: UpdateSeasonDTO; //
let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiSeasonUpdatePut(
    updateSeasonDTO,
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateSeasonDTO** | **UpdateSeasonDTO**|  | |
| **id** | [**string**] |  | (optional) defaults to undefined|


### Return type

**GetSeasonDTO**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

