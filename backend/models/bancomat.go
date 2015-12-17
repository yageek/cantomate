package models

import (
	"github.com/GoogleCloudPlatform/go-endpoints/endpoints"
	"golang.org/x/net/context"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

// Bancomat represents an ATM in
// the datastore.
type Bancomat struct {
	Key      *datastore.Key     `json:"id" datastore:"-"`
	Location appengine.GeoPoint `datastore:"location"`
	BankKey  *datastore.Key     `datastore:"bankKey"`
}

// BancomatListReq is the request type for BancomatService.List.
type BancomatListReq struct {
	Limit int `json:"limit" endpoints:"d=10"`
}

// BancomatList is the response type for BancomatService.List.
type BancomatList struct {
	Bancomats []*Bancomat `json:"atms"`
}

// BancomatAddReq is the request type for adding request.
type BancomatAddReq struct {
	BankKey   string  `json:"bank_id"`
	Longitude float64 `json:"longitude"`
	Latitude  float64 `json:"latitude"`
}

// BancomatService offers operations to add and list bancomat
type BancomatService struct{}

// List returns a list of bancomats
func (s *BancomatService) List(c context.Context, r *BancomatListReq) (*BancomatList, error) {

	q := datastore.NewQuery("Bancomat").Limit(r.Limit)

	bancomats := make([]*Bancomat, 0, r.Limit)
	keys, err := q.GetAll(c, &bancomats)

	if err != nil {
		return nil, err
	}

	for i, k := range keys {
		bancomats[i].Key = k
	}
	return &BancomatList{bancomats}, nil
}

func (s *BancomatService) Add(c context.Context, r *BancomatAddReq) error {
	k := datastore.NewIncompleteKey(c, "Bancomat", nil)

	location := appengine.GeoPoint{Lat: r.Latitude, Lng: r.Longitude}
	b := &Bancomat{Location: location}

	_, err := datastore.Put(c, k, b)
	return err
}

// RegisterBancomatService offers list and add user
func RegisterBancomatService() (*endpoints.RPCService, error) {

	api := &BancomatService{}

	return endpoints.RegisterService(api,
		"bancomat", "v1", "Bancomat Service", true)
}
