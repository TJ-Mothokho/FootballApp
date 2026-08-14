# PlayerMatchStatsApi

All URIs are relative to *https://footballanalysisapi-gucjcmcrf7acafej.southafricanorth-01.azurewebsites.net*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPlayerMatchStatsAllGet**](#apiplayermatchstatsallget) | **GET** /api/PlayerMatchStats/all | |
|[**apiPlayerMatchStatsCreatePost**](#apiplayermatchstatscreatepost) | **POST** /api/PlayerMatchStats/create | |
|[**apiPlayerMatchStatsDeletePost**](#apiplayermatchstatsdeletepost) | **POST** /api/PlayerMatchStats/delete | |
|[**apiPlayerMatchStatsIdGet**](#apiplayermatchstatsidget) | **GET** /api/PlayerMatchStats/{id} | |
|[**apiPlayerMatchStatsUpdatePut**](#apiplayermatchstatsupdateput) | **PUT** /api/PlayerMatchStats/update | |

# **apiPlayerMatchStatsAllGet**
> Array<GetPlayerMatchStatsDTO> apiPlayerMatchStatsAllGet()


### Example

```typescript
import {
    PlayerMatchStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerMatchStatsApi(configuration);

const { status, data } = await apiInstance.apiPlayerMatchStatsAllGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<GetPlayerMatchStatsDTO>**

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

# **apiPlayerMatchStatsCreatePost**
> GetPlayerMatchStatsDTO apiPlayerMatchStatsCreatePost(createPlayerMatchStatsDTO)


### Example

```typescript
import {
    PlayerMatchStatsApi,
    Configuration,
    CreatePlayerMatchStatsDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerMatchStatsApi(configuration);

let createPlayerMatchStatsDTO: CreatePlayerMatchStatsDTO; //

const { status, data } = await apiInstance.apiPlayerMatchStatsCreatePost(
    createPlayerMatchStatsDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPlayerMatchStatsDTO** | **CreatePlayerMatchStatsDTO**|  | |


### Return type

**GetPlayerMatchStatsDTO**

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

# **apiPlayerMatchStatsDeletePost**
> apiPlayerMatchStatsDeletePost()


### Example

```typescript
import {
    PlayerMatchStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerMatchStatsApi(configuration);

let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiPlayerMatchStatsDeletePost(
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

# **apiPlayerMatchStatsIdGet**
> GetPlayerMatchStatsDTO apiPlayerMatchStatsIdGet()


### Example

```typescript
import {
    PlayerMatchStatsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerMatchStatsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiPlayerMatchStatsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetPlayerMatchStatsDTO**

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

# **apiPlayerMatchStatsUpdatePut**
> GetPlayerMatchStatsDTO apiPlayerMatchStatsUpdatePut(updatePlayerMatchStatsDTO)


### Example

```typescript
import {
    PlayerMatchStatsApi,
    Configuration,
    UpdatePlayerMatchStatsDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerMatchStatsApi(configuration);

let updatePlayerMatchStatsDTO: UpdatePlayerMatchStatsDTO; //
let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiPlayerMatchStatsUpdatePut(
    updatePlayerMatchStatsDTO,
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updatePlayerMatchStatsDTO** | **UpdatePlayerMatchStatsDTO**|  | |
| **id** | [**string**] |  | (optional) defaults to undefined|


### Return type

**GetPlayerMatchStatsDTO**

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

