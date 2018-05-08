# install.packages('RJSONIO')
library(RJSONIO)
library(dplyr)

berdo_data <- read.csv('data/BERDOBuildingAddresses.csv')
berdo_data$fullAddress <- paste(berdo_data$Address,' Boston MA ',temp$ZIP)

summary(berdo_data)

temp <- berdo_data[1:5,]
# temp$fullAddress <- paste(temp$Address,' Boston MA ',temp$ZIP)
temp$fullAddress <- paste(temp$Address,' ', temp$ZIP)

geocodeAddress <- function(address) {
  require(RJSONIO)
  url <- "http://maps.google.com/maps/api/geocode/json?address="
  url <- URLencode(paste(url, address, "&sensor=false&key=AIzaSyBBPRj49j8PXNKiF2fcfFKhFStQ66QVj7Q", sep = ""))
  x <- fromJSON(url, simplify = FALSE)
  if (x$status == "OK") {
    out <- c(x$results[[1]]$geometry$location$lng,
             x$results[[1]]$geometry$location$lat,
             x$status)
  } else {
    out <- c('',
             '',
             x$status)
  }
  Sys.sleep(2)  # API only allows 5 requests per second
  print(out)
  out
}

berdo_data[,c('lng', 'lat', 'status')] <- t(apply(berdo_data, 1, function(x) geocodeAdddress(x['fullAddress'])))

locationFound <- filter(temp, status!="OVER_QUERY_LIMIT")
locationMissing <- filter(temp, status=="OVER_QUERY_LIMIT")
temp<-locationMissing

write.csv(locationFound, 'data/taxBuildingLatLon9.csv')
write.csv(locationMissing, 'data/taxBuildingLatLonMissing.csv')

temp[,c('lng', 'lat', 'status')] <- t(apply(temp, 1, function(x) geocodeAdddress(x['fullAddress'])))

#temp remove non null fields
temp <- temp[grep("[[:digit:]]", temp$LATITUDE) ,]
temp[] <- lapply(temp, function(x) if(is.factor(x)) factor(x) else x)
