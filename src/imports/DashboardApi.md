# DashboardApi

All URIs are relative to *https://footballanalysisapi-gucjcmcrf7acafej.southafricanorth-01.azurewebsites.net*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiDashboardFormTableGet**](#apidashboardformtableget) | **GET** /api/Dashboard/form-table | |
|[**apiDashboardGoalsPerRoundGet**](#apidashboardgoalsperroundget) | **GET** /api/Dashboard/goals-per-round | |
|[**apiDashboardOverviewGet**](#apidashboardoverviewget) | **GET** /api/Dashboard/overview | |
|[**apiDashboardRecentMatchesGet**](#apidashboardrecentmatchesget) | **GET** /api/Dashboard/recent-matches | |
|[**apiDashboardTopAssistsGet**](#apidashboardtopassistsget) | **GET** /api/Dashboard/top-assists | |
|[**apiDashboardTopRatedGet**](#apidashboardtopratedget) | **GET** /api/Dashboard/top-rated | |
|[**apiDashboardTopScorersGet**](#apidashboardtopscorersget) | **GET** /api/Dashboard/top-scorers | |
|[**apiDashboardUpcomingFixturesGet**](#apidashboardupcomingfixturesget) | **GET** /api/Dashboard/upcoming-fixtures | |

# **apiDashboardFormTableGet**
> Array<StandingDTO> apiDashboardFormTableGet()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.apiDashboardFormTableGet();
```

### Parameters
This endpoint does not have any parameters.


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

# **apiDashboardGoalsPerRoundGet**
> Array<GoalsPerRoundDTO> apiDashboardGoalsPerRoundGet()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.apiDashboardGoalsPerRoundGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<GoalsPerRoundDTO>**

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

# **apiDashboardOverviewGet**
> DashboardOverviewDTO apiDashboardOverviewGet()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.apiDashboardOverviewGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**DashboardOverviewDTO**

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

# **apiDashboardRecentMatchesGet**
> Array<GetMatchDTO> apiDashboardRecentMatchesGet()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.apiDashboardRecentMatchesGet();
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

# **apiDashboardTopAssistsGet**
> Array<PlayerLeaderDTO> apiDashboardTopAssistsGet()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.apiDashboardTopAssistsGet();
```

### Parameters
This endpoint does not have any parameters.


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

# **apiDashboardTopRatedGet**
> Array<PlayerLeaderDTO> apiDashboardTopRatedGet()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.apiDashboardTopRatedGet();
```

### Parameters
This endpoint does not have any parameters.


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

# **apiDashboardTopScorersGet**
> Array<PlayerLeaderDTO> apiDashboardTopScorersGet()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.apiDashboardTopScorersGet();
```

### Parameters
This endpoint does not have any parameters.


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

# **apiDashboardUpcomingFixturesGet**
> Array<GetMatchDTO> apiDashboardUpcomingFixturesGet()


### Example

```typescript
import {
    DashboardApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DashboardApi(configuration);

const { status, data } = await apiInstance.apiDashboardUpcomingFixturesGet();
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

