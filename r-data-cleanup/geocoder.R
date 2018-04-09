install.packages('RJSONIO')

berdo_data <- read.csv('data/berdo2017.csv')

temp <- berdo_data[1:5,]
temp$fullAddress <- paste(temp$Address,' ',temp$ZIP)

geocodeAdddress <- function(address) {
  require(RJSONIO)
  url <- "http://maps.google.com/maps/api/geocode/json?address="
  url <- URLencode(paste(url, address, "&sensor=false", sep = ""))
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

temp[,c('lng', 'lat', 'status')] <- t(apply(temp, 1, function(x) geocodeAdddress(x['fullAddress'])))
