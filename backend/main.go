package backend

import (
	"models"

	"github.com/GoogleCloudPlatform/go-endpoints/endpoints"
)

func init() {
	if _, err := models.RegisterBancomatService(); err != nil {
		panic(err.Error())
	}
	if _, err := models.RegisterBankService(); err != nil {
		panic(err.Error())
	}
	endpoints.HandleHTTP()
}
