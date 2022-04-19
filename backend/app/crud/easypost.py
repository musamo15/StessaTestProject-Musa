from http import HTTPStatus
from app.models.routerModels import (ShipmentResponseModel)
import easypost
from decouple import config
from fastapi import HTTPException


easypost.api_key = config("EASYPOST_API_KEY")


async def create_address(newAddress):

    try:
        address = easypost.Address.create(
            verify=['true'],
            **newAddress.dict()
        )
        return address.id

    except easypost.Error as exception:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST,
                            detail=str(exception))


async def create_parcel(newParcel):
    try:
        parcel = easypost.Parcel.create(
            **newParcel.dict()
        )
        return parcel.id

    except easypost.Error as exception:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST,
                            detail=str(exception))


async def create_shipment(from_address_id, to_address_id, parcel_id):

    try:
        # Verify from address id, to address id and parcel id
        to_address = easypost.Address.retrieve(to_address_id)
        from_address = easypost.Address.retrieve(from_address_id)
        parcel = easypost.Parcel.retrieve(parcel_id)

    except easypost.Error as exception:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST,
                            detail=str(exception))

    try:
        shipment = easypost.Shipment.create(
            to_address=to_address,
            from_address=from_address,
            parcel=parcel
        )
    except easypost.Error as exception:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST,
                            detail=str(exception))
    
    return ShipmentResponseModel.parse_obj(shipment.to_dict())


async def create_label(shipmentId, rate_id):

    # Verify Shipment ID
    try:
        shipment = easypost.Shipment.retrieve(shipmentId)

    except easypost.Error as exception:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST,
                            detail="Invalid Shipment ID: " + str(exception))

    try:
        shipment.buy(rate={'id': rate_id})
    except easypost.Error as exception:
        raise HTTPException(status_code=HTTPStatus.BAD_REQUEST,
                            detail="Invalid rate: " + str(exception))

    return shipment.postage_label.label_url
