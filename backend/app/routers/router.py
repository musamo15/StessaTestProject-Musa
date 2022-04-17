from fastapi import APIRouter

from app.models.routerModels import (AddressModel, ParcelModel,ShipmentResponseModel)
from app.crud.easypost import (create_address, create_parcel, create_shipment,create_label)

rout = APIRouter()



"""
    Shipment Requests
"""
@rout.post("/address",response_model = str)
async def user_create_address(adddres: AddressModel):
    return await create_address(adddres)

@rout.post("/parcel",response_model = str)
async def user_create_parcel(parcel: ParcelModel):
    return await create_parcel(parcel)

@rout.post("/shipment",response_model = ShipmentResponseModel)
async def user_create_shipment(from_address_id: str, to_address_id: str, parcel_id: str):
    return await create_shipment(from_address_id,to_address_id,parcel_id)

"""
    Label Requests
"""
@rout.post("/label")
async def user_create_label(shipment_id: str, rate_id: str):
    return await create_label(shipment_id,rate_id)
    

