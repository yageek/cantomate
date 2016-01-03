package models

import (
	"github.com/GoogleCloudPlatform/go-endpoints/endpoints"
	"golang.org/x/net/context"
	"google.golang.org/appengine/datastore"
)

// Bank represents a banking company
type Bank struct {
	Key     *datastore.Key `json:"id" datastore:"-"`
	Name    string         `json:"name" datastore:"name" endpoints:"req"`
	Address string         `json:"address" datastore:"address" endpoints:"req"`
	Logo    []byte         `json:"logo" datastore:"logo"`
}

// BankList represents a list of bank items.
type BankList struct {
	Banks []*Bank `json:"banks"`
}

// BankService represents a service
type BankService struct{}

// BankListReq represents a list request
type BankListReq struct {
	Limit int `json:"limit" endpoints:"d=10"`
}

// List retrieves the list of the bank
// with the provided limit.
func (s *BankService) List(c context.Context, r *BancomatListReq) (*BankList, error) {
	q := datastore.NewQuery("Bank").Limit(r.Limit)
	banks := make([]*Bank, 0, r.Limit)
	keys, err := q.GetAll(c, &banks)

	if err != nil {
		return nil, err
	}

	for i, k := range keys {
		banks[i].Key = k
	}

	return &BankList{banks}, nil
}

// Add a Bank to the database
func (s *BankService) Add(c context.Context, b *Bank) error {
	k := datastore.NewIncompleteKey(c, "Bank", nil)
	_, err := datastore.Put(c, k, b)
	return err
}

// RegisterBancomatService offers list and add user
func RegisterBankService() (*endpoints.RPCService, error) {

	api := &BankService{}
	return endpoints.RegisterService(api,
		"banks", "v1", "Banks Service", true)

}
