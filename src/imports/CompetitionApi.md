# CompetitionApi

All URIs are relative to *https://footballanalysisapi-gucjcmcrf7acafej.southafricanorth-01.azurewebsites.net*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiCompetitionAllGet**](#apicompetitionallget) | **GET** /api/Competition/all | |
|[**apiCompetitionCreatePost**](#apicompetitioncreatepost) | **POST** /api/Competition/create | |
|[**apiCompetitionDeleteIdDelete**](#apicompetitiondeleteiddelete) | **DELETE** /api/Competition/delete/{id} | |
|[**apiCompetitionIdFixturesGet**](#apicompetitionidfixturesget) | **GET** /api/Competition/{id}/fixtures | |
|[**apiCompetitionIdGet**](#apicompetitionidget) | **GET** /api/Competition/{id} | |
|[**apiCompetitionIdResultsGet**](#apicompetitionidresultsget) | **GET** /api/Competition/{id}/results | |
|[**apiCompetitionIdStandingsGet**](#apicompetitionidstandingsget) | **GET** /api/Competition/{id}/standings | |
|[**apiCompetitionIdStatisticsGet**](#apicompetitionidstatisticsget) | **GET** /api/Competition/{id}/statistics | |
|[**apiCompetitionIdTopScorersGet**](#apicompetitionidtopscorersget) | **GET** /api/Competition/{id}/top-scorers | |
|[**apiCompetitionUpdatePut**](#apicompetitionupdateput) | **PUT** /api/Competition/update | |

# **apiCompetitionAllGet**
> Array<GetCompetitionDTO> apiCompetitionAllGet()


### Example

```typescript
import {
    CompetitionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CompetitionApi(configuration);

const { status, data } = await apiInstance.apiCompetitionAllGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<GetCompetitionDTO>**

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

# **apiCompetitionCreatePost**
> GetCompetitionDTO apiCompetitionCreatePost(createCompetitionDTO)


### Example

```typescript
import {
    CompetitionApi,
    Configuration,
    CreateCompetitionDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new CompetitionApi(configuration);

let createCompetitionDTO: CreateCompetitionDTO; //

const { status, data } = await apiInstance.apiCompetitionCreatePost(
    createCompetitionDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCompetitionDTO** | **CreateCompetitionDTO**|  | |


### Return type

**GetCompetitionDTO**

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

# **apiCompetitionDeleteIdDelete**
> apiCompetitionDeleteIdDelete()


### Example

```typescript
import {
    CompetitionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CompetitionApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCompetitionDeleteIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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

# **apiCompetitionIdFixturesGet**
> Array<GetMatchDTO> apiCompetitionIdFixturesGet()


### Example

```typescript
import {
    CompetitionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CompetitionApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCompetitionIdFixturesGet(
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

# **apiCompetitionIdGet**
> GetCompetitionDTO apiCompetitionIdGet()


### Example

```typescript
import {
    CompetitionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CompetitionApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCompetitionIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetCompetitionDTO**

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

# **apiCompetitionIdResultsGet**
> Array<GetMatchDTO> apiCompetitionIdResultsGet()


### Example

```typescript
import {
    CompetitionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CompetitionApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCompetitionIdResultsGet(
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

# **apiCompetitionIdStandingsGet**
> Array<StandingDTO> apiCompetitionIdStandingsGet()


### Example

```typescript
import {
    CompetitionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CompetitionApi(configuration);

let id: string; // (default to undefined)
let seasonId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiCompetitionIdStandingsGet(
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

**Array<StandingDTO>**

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

# **apiCompetitionIdStatisticsGet**
> CompetitionStatisticsDTO apiCompetitionIdStatisticsGet()


### Example

```typescript
import {
    CompetitionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CompetitionApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCompetitionIdStatisticsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CompetitionStatisticsDTO**

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

# **apiCompetitionIdTopScorersGet**
> Array<PlayerLeaderDTO> apiCompetitionIdTopScorersGet()


### Example

```typescript
import {
    CompetitionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CompetitionApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCompetitionIdTopScorersGet(
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

# **apiCompetitionUpdatePut**
> GetCompetitionDTO apiCompetitionUpdatePut(updateCompetitionDTO)


### Example

```typescript
import {
    CompetitionApi,
    Configuration,
    UpdateCompetitionDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new CompetitionApi(configuration);

let updateCompetitionDTO: UpdateCompetitionDTO; //
let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiCompetitionUpdatePut(
    updateCompetitionDTO,
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCompetitionDTO** | **UpdateCompetitionDTO**|  | |
| **id** | [**string**] |  | (optional) defaults to undefined|


### Return type

**GetCompetitionDTO**

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

