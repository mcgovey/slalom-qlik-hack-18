library(rgeos)
library(sp)
library(rgdal)

install.packages('rgeos')
install.packages('rgdal')

ma.map <- readOGR("data/ZillowNeighborhoods-MA.shp", layer="ZillowNeighborhoods-MA")


sodo <- ma.map[ma.map$CITY == "Boston", ]

# Don't use df as name, it is an R function
# Better to set longitudes as the first column and latitudes as the second
dat <- data.frame(Longitude = temp$LONGITUDE,
                  Latitude =temp$LATITUDE,
                  names = temp$MAIL_ADDRESS)
# Assignment modified according
coordinates(dat) <- ~ Longitude + Latitude
# Set the projection of the SpatialPointsDataFrame using the projection of the shapefile
proj4string(dat) <- proj4string(sodo)

over(dat, sodo)
#  STATE COUNTY    CITY                NAME REGIONID
#1    WA   King Seattle Industrial District   271892
#2  <NA>   <NA>    <NA>                <NA>       NA
#3  <NA>   <NA>    <NA>                <NA>       NA

over(sodo, dat)
#           names
#122 Safeco Field


# sodo <- wa.map[wa.map$CITY == "Boston"  & wa.map$NAME == "Industrial District", ]
# 
# # Don't use df as name, it is an R function
# # Better to set longitudes as the first column and latitudes as the second
# dat <- data.frame(Longitude = c(-122.332271,-122.353985,-122.331639),
#                   Latitude =c(47.591351, 47.62212,47.595152),
#                   names = c("Safeco Field", "Key Arena", "Century Link"))
# # Assignment modified according
# coordinates(dat) <- ~ Longitude + Latitude
# # Set the projection of the SpatialPointsDataFrame using the projection of the shapefile
# proj4string(dat) <- proj4string(sodo)
# 
# over(dat, sodo)
# #  STATE COUNTY    CITY                NAME REGIONID
# #1    WA   King Seattle Industrial District   271892
# #2  <NA>   <NA>    <NA>                <NA>       NA
# #3  <NA>   <NA>    <NA>                <NA>       NA
# 
# over(sodo, dat)
# #           names
# #122 Safeco Field