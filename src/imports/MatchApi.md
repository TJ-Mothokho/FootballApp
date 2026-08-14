# MatchApi

All URIs are relative to *https://footballanalysisapi-gucjcmcrf7acafej.southafricanorth-01.azurewebsites.net*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiMatchAllGet**](#apimatchallget) | **GET** /api/Match/all | |
|[**apiMatchByCompetitionCompetitionIdGet**](#apimatchbycompetitioncompetitionidget) | **GET** /api/Match/by-competition/{competitionId} | |
|[**apiMatchBySeasonSeasonIdGet**](#apimatchbyseasonseasonidget) | **GET** /api/Match/by-season/{seasonId} | |
|[**apiMatchByTeamTeamIdGet**](#apimatchbyteamteamidget) | **GET** /api/Match/by-team/{teamId} | |
|[**apiMatchCompletedGet**](#apimatchcompletedget) | **GET** /api/Match/completed | |
|[**apiMatchCreatePost**](#apimatchcreatepost) | **POST** /api/Match/create | |
|[**apiMatchDeletePost**](#apimatchdeletepost) | **POST** /api/Match/delete | |
|[**apiMatchIdGet**](#apimatchidget) | **GET** /api/Match/{id} | |
|[**apiMatchIdPlayerStatsGet**](#apimatchidplayerstatsget) | **GET** /api/Match/{id}/player-stats | |
|[**apiMatchIdSummaryGet**](#apimatchidsummaryget) | **GET** /api/Match/{id}/summary | |
|[**apiMatchIdTeamStatsGet**](#apimatchidteamstatsget) | **GET** /api/Match/{id}/team-stats | |
|[**apiMatchIdWorkspaceGet**](#apimatchidworkspaceget) | **GET** /api/Match/{id}/workspace | |
|[**apiMatchLatestGet**](#apimatchlatestget) | **GET** /api/Match/latest | |
|[**apiMatchTodayGet**](#apimatchtodayget) | **GET** /api/Match/today | |
|[**apiMatchUpcomingGet**](#apimatchupcomingget) | **GET** /api/Match/upcoming | |
|[**apiMatchUpdatePut**](#apimatchupdateput) | **PUT** /api/Match/update | |

# **apiMatchAllGet**
> Array<GetMatchDTO> apiMatchAllGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

const { status, data } = await apiInstance.apiMatchAllGet();
```

### Parameters
This endpoint does not have any parameters.


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

# **apiMatchByCompetitionCompetitionIdGet**
> Array<GetMatchDTO> apiMatchByCompetitionCompetitionIdGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

let competitionId: string; // (default to undefined)

const { status, data } = await apiInstance.apiMatchByCompetitionCompetitionIdGet(
    competitionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **competitionId** | [**string**] |  | defaults to undefined|


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

# **apiMatchBySeasonSeasonIdGet**
> Array<GetMatchDTO> apiMatchBySeasonSeasonIdGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

let seasonId: string; // (default to undefined)

const { status, data } = await apiInstance.apiMatchBySeasonSeasonIdGet(
    seasonId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **seasonId** | [**string**] |  | defaults to undefined|


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

# **apiMatchByTeamTeamIdGet**
> Array<GetMatchDTO> apiMatchByTeamTeamIdGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

let teamId: string; // (default to undefined)

const { status, data } = await apiInstance.apiMatchByTeamTeamIdGet(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**string**] |  | defaults to undefined|


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

# **apiMatchCompletedGet**
> Array<GetMatchDTO> apiMatchCompletedGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

const { status, data } = await apiInstance.apiMatchCompletedGet();
```

### Parameters
This endpoint does not have any parameters.


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

# **apiMatchCreatePost**
> GetMatchDTO apiMatchCreatePost(createMatchDTO)


### Example

```typescript
import {
    MatchApi,
    Configuration,
    CreateMatchDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

let createMatchDTO: CreateMatchDTO; //

const { status, data } = await apiInstance.apiMatchCreatePost(
    createMatchDTO
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createMatchDTO** | **CreateMatchDTO**|  | |


### Return type

**GetMatchDTO**

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

# **apiMatchDeletePost**
> apiMatchDeletePost()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiMatchDeletePost(
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

# **apiMatchIdGet**
> GetMatchDTO apiMatchIdGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiMatchIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GetMatchDTO**

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

# **apiMatchIdPlayerStatsGet**
> Array<GetPlayerMatchStatsDTO> apiMatchIdPlayerStatsGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiMatchIdPlayerStatsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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

# **apiMatchIdSummaryGet**
> MatchSummaryDTO apiMatchIdSummaryGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiMatchIdSummaryGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**MatchSummaryDTO**

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

# **apiMatchIdTeamStatsGet**
> Array<GetTeamMatchStatsDTO> apiMatchIdTeamStatsGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiMatchIdTeamStatsGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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

# **apiMatchIdWorkspaceGet**
> MatchWorkspaceDTO apiMatchIdWorkspaceGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiMatchIdWorkspaceGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**MatchWorkspaceDTO**

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

# **apiMatchLatestGet**
> Array<GetMatchDTO> apiMatchLatestGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

const { status, data } = await apiInstance.apiMatchLatestGet();
```

### Parameters
This endpoint does not have any parameters.


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

# **apiMatchTodayGet**
> Array<GetMatchDTO> apiMatchTodayGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

const { status, data } = await apiInstance.apiMatchTodayGet();
```

### Parameters
This endpoint does not have any parameters.


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

# **apiMatchUpcomingGet**
> Array<GetMatchDTO> apiMatchUpcomingGet()


### Example

```typescript
import {
    MatchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

const { status, data } = await apiInstance.apiMatchUpcomingGet();
```

### Parameters
This endpoint does not have any parameters.


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

# **apiMatchUpdatePut**
> GetMatchDTO apiMatchUpdatePut(updateMatchDTO)


### Example

```typescript
import {
    MatchApi,
    Configuration,
    UpdateMatchDTO
} from './api';

const configuration = new Configuration();
const apiInstance = new MatchApi(configuration);

let updateMatchDTO: UpdateMatchDTO; //
let id: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiMatchUpdatePut(
    updateMatchDTO,
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateMatchDTO** | **UpdateMatchDTO**|  | |
| **id** | [**string**] |  | (optional) defaults to undefined|


### Return type

**GetMatchDTO**

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

