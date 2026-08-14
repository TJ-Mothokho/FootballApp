# TeamMatchStatsApi

All URIs are relative to *https://footballanalysisapi-gucjcmcrf7acafej.southafricanorth-01.azurewebsites.net*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiTeamMatchStatsAllGet**](#apiteammatchstatsallget) | **GET** /api/TeamMatchStats/all | |
|[**apiTeamMatchStatsCreatePost**](#apiteammatchstatscreatepost) | **POST** /api/TeamMatchStats/create | |
|[**apiTeamMatchStatsDeletePost**](#apiteammatchstatsdeletepost) | **POST** /api/TeamMatchStats/delete | |
|[**apiTeamMatchStatsIdGet**](#apiteammatchstatsidget) | **GET** /api/TeamMatchStats/{id} | |
|[**apiTeamMatchStatsUpdatePut**](#apiteammatchstatsupdateput) | **PUT** /api/TeamMatchStats/update | |

# **apiTeamMatchStatsAllGet**
> Array<GetTeamMatchStatsDTO> apiTeamMatchStatsAllGet()


### Example

```typescript
import {
    TeamMatchStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamMatchStatsApi(configuration);

const { status, data } = await apiInstance.apiTeamMatchStatsAllGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<GetTeamMatchStatsDTO>**

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

# **apiTeamMatchStatsCreatePost**
> GetTeamMatchStatsDTO apiTeamMatchStatsCreatePost(createTeamMatchStatsDTO)


### Example

```typescript
import {
    TeamMatchStatsApi,
    Configuration,
    CreateTeamMatchStatsDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamMatchStatsApi(configuration);

let createTeamMatchStatsDTO: CreateTeamMatchStatsDTO; //

const { status, data } = await apiInstance.apiTeamMatchStatsCreatePost(
    createTeamMatchStatsDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTeamMatchStatsDTO** | **CreateTeamMatchStatsDTO**|  | |


### Return type

**GetTeamMatchStatsDTO**

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

# **apiTeamMatchStatsDeletePost**
> apiTeamMatchStatsDeletePost()


### Example

```typescript
import {
    TeamMatchStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamMatchStatsApi(configuration);

let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiTeamMatchStatsDeletePost(
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

# **apiTeamMatchStatsIdGet**
> GetTeamMatchStatsDTO apiTeamMatchStatsIdGet()


### Example

```typescript
import {
    TeamMatchStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamMatchStatsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiTeamMatchStatsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetTeamMatchStatsDTO**

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

# **apiTeamMatchStatsUpdatePut**
> GetTeamMatchStatsDTO apiTeamMatchStatsUpdatePut(updateTeamMatchStatsDTO)


### Example

```typescript
import {
    TeamMatchStatsApi,
    Configuration,
    UpdateTeamMatchStatsDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamMatchStatsApi(configuration);

let updateTeamMatchStatsDTO: UpdateTeamMatchStatsDTO; //
let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiTeamMatchStatsUpdatePut(
    updateTeamMatchStatsDTO,
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTeamMatchStatsDTO** | **UpdateTeamMatchStatsDTO**|  | |
| **id** | [**string**] |  | (optional) defaults to undefined|


### Return type

**GetTeamMatchStatsDTO**

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

