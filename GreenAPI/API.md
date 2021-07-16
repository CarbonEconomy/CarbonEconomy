Endpoint: https://fv1au9jx9a.execute-api.us-east-1.amazonaws.com/dev/

## Emissions API
----
  <_Additional information about your API call. Try to use verbs that match both request type (fetching vs modifying) and plurality (one vs multiple)._>

### URL

  <_The URL Structure (path only, no root url)_>
  /emissions
### Method
  
  <_The request type_>

  `POST`
  
<!-- *  **URL Params**

   <_If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints._> 

   **Required:**
 
   `id=[integer]`

   **Optional:**
 
   `photo_id=[alphanumeric]` -->

### Data Params
  <_If making a post request, what should the body payload look like? URL Params rules apply here too._>

#### start (required)
  Obj in the following format 
  ```
  {
    "lng": float,
    "lat": float
  }
  ```
#### end (required)
  Obj in the following format 
  ```
  {
    "lng": float,
    "lat": float
  }
  ```

#### type
One of `LOCAL_DELIVERY`(default), `GLOBAL_DELIVERY`

#### routes
An array containing the following string values
  * For Local Delivery
    * CAR
    * DIESEL_CAR
    * HYBRID_CAR
    * ELECTRIC_CAR
    * TRUCK
    * VAN
    * BIKE
    * E_SCOOTER
    * BICYCLE
    * WALKER
  * For Global Delivery
    * "AIR"
    * "SHIP"
  * Default values if not provided
    * CAR
    * HYBRID_CAR
    * ELECTRIC_CAR
    * BIKE
    * E_SCOOTER
    * BICYCLE
    * WALKER

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

  ```
    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"start": {"lng": 103.871861615443, "lat": 1.3506755212032}, "end": {"lng": 103.864551955664, "lat": 1.34986198545139}}' \
    https://fv1au9jx9a.execute-api.us-east-1.amazonaws.com/dev/emissions
  ```

  **Code:** 200 <br />
  **Content:**
  ```
    [
      {
        "route": "CAR",
        "carbonEmissions": 210.74,
        "carbonEmissionsSaved": 0,
        "credits": 0
      },
      {
        "route": "HYBRID_CAR",
        "carbonEmissions": 184.3975,
        "carbonEmissionsSaved": 26.3425,
        "credits": 26
      },
      {
        "route": "ELECTRIC_CAR",
        "carbonEmissions": 158.055,
        "carbonEmissionsSaved": 52.685,
        "credits": 52
      },
      {
        "route": "BIKE",
        "carbonEmissions": 184.3975,
        "carbonEmissionsSaved": 26.3425,
        "credits": 26
      },
      {
        "route": "E_SCOOTER",
        "carbonEmissions": 52.685,
        "carbonEmissionsSaved": 158.055,
        "credits": 158
      },
      {
        "route": "BICYCLE",
        "carbonEmissions": 0,
        "carbonEmissionsSaved": 210.74,
        "credits": 210
      },
      {
        "route": "WALKER",
        "carbonEmissions": 0,
        "carbonEmissionsSaved": 210.74,
        "credits": 210
      }
    ]
  ```

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 
  A GET request would be the correct RESTful way to do this, but that would mean serialising JSON into query string of which there is no common standard. 