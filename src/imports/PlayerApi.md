# PlayerApi

All URIs are relative to *https://footballanalysisapi-gucjcmcrf7acafej.southafricanorth-01.azurewebsites.net*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPlayerAllGet**](#apiplayerallget) | **GET** /api/Player/all | |
|[**apiPlayerCreatePost**](#apiplayercreatepost) | **POST** /api/Player/create | |
|[**apiPlayerDeletePost**](#apiplayerdeletepost) | **POST** /api/Player/delete | |
|[**apiPlayerIdAssistsGet**](#apiplayeridassistsget) | **GET** /api/Player/{id}/assists | |
|[**apiPlayerIdComparisonOtherPlayerIdGet**](#apiplayeridcomparisonotherplayeridget) | **GET** /api/Player/{id}/comparison/{otherPlayerId} | |
|[**apiPlayerIdGet**](#apiplayeridget) | **GET** /api/Player/{id} | |
|[**apiPlayerIdGoalsGet**](#apiplayeridgoalsget) | **GET** /api/Player/{id}/goals | |
|[**apiPlayerIdLast5Get**](#apiplayeridlast5get) | **GET** /api/Player/{id}/last5 | |
|[**apiPlayerIdMatchesGet**](#apiplayeridmatchesget) | **GET** /api/Player/{id}/matches | |
|[**apiPlayerIdRatingsGet**](#apiplayeridratingsget) | **GET** /api/Player/{id}/ratings | |
|[**apiPlayerIdSeasonStatsGet**](#apiplayeridseasonstatsget) | **GET** /api/Player/{id}/season-stats | |
|[**apiPlayerIdStatisticsGet**](#apiplayeridstatisticsget) | **GET** /api/Player/{id}/statistics | |
|[**apiPlayerUpdatePut**](#apiplayerupdateput) | **PUT** /api/Player/update | |

# **apiPlayerAllGet**
> Array<GetPlayerDTO> apiPlayerAllGet()


### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

const { status, data } = await apiInstance.apiPlayerAllGet();
```

### Parameters
This endpoint does not have any parameters.


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

# **apiPlayerCreatePost**
> GetPlayerDTO apiPlayerCreatePost(createPlayerDTO)


### Example

```typescript
import {
    PlayerApi,
    Configuration,
    CreatePlayerDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let createPlayerDTO: CreatePlayerDTO; //

const { status, data } = await apiInstance.apiPlayerCreatePost(
    createPlayerDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPlayerDTO** | **CreatePlayerDTO**|  | |


### Return type

**GetPlayerDTO**

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

# **apiPlayerDeletePost**
> apiPlayerDeletePost()


### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiPlayerDeletePost(
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

# **apiPlayerIdAssistsGet**
> ApiPlayerIdGoalsGet200Response apiPlayerIdAssistsGet()


### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiPlayerIdAssistsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiPlayerIdGoalsGet200Response**

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

# **apiPlayerIdComparisonOtherPlayerIdGet**
> PlayerComparisonDTO apiPlayerIdComparisonOtherPlayerIdGet()


### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let id: string; // (default to undefined)
let otherPlayerId: string; // (default to undefined)

const { status, data } = await apiInstance.apiPlayerIdComparisonOtherPlayerIdGet(
    id,
    otherPlayerId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|
| **otherPlayerId** | [**string**] |  | defaults to undefined|


### Return type

**PlayerComparisonDTO**

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

# **apiPlayerIdGet**
> GetPlayerDTO apiPlayerIdGet()


### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiPlayerIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetPlayerDTO**

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

# **apiPlayerIdGoalsGet**
> ApiPlayerIdGoalsGet200Response apiPlayerIdGoalsGet()


### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiPlayerIdGoalsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**ApiPlayerIdGoalsGet200Response**

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

# **apiPlayerIdLast5Get**
> Array<GetMatchDTO> apiPlayerIdLast5Get()


### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiPlayerIdLast5Get(
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

# **apiPlayerIdMatchesGet**
> Array<GetMatchDTO> apiPlayerIdMatchesGet()


### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiPlayerIdMatchesGet(
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

# **apiPlayerIdRatingsGet**
> Array<ApiPlayerIdRatingsGet200ResponseInner> apiPlayerIdRatingsGet()


### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiPlayerIdRatingsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Array<ApiPlayerIdRatingsGet200ResponseInner>**

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

# **apiPlayerIdSeasonStatsGet**
> PlayerStatisticsDTO apiPlayerIdSeasonStatsGet()


### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let id: string; // (default to undefined)
let seasonId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiPlayerIdSeasonStatsGet(
    id,
    seasonId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|
| **seasonId** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PlayerStatisticsDTO**

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

# **apiPlayerIdStatisticsGet**
> PlayerStatisticsDTO apiPlayerIdStatisticsGet()


### Example

```typescript
import {
    PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let id: string; // (default to undefined)
let seasonId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiPlayerIdStatisticsGet(
    id,
    seasonId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|
| **seasonId** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PlayerStatisticsDTO**

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

# **apiPlayerUpdatePut**
> GetPlayerDTO apiPlayerUpdatePut(updatePlayerDTO)


### Example

```typescript
import {
    PlayerApi,
    Configuration,
    UpdatePlayerDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayerApi(configuration);

let updatePlayerDTO: UpdatePlayerDTO; //
let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiPlayerUpdatePut(
    updatePlayerDTO,
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updatePlayerDTO** | **UpdatePlayerDTO**|  | |
| **id** | [**string**] |  | (optional) defaults to undefined|


### Return type

**GetPlayerDTO**

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

