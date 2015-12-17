package models

import (
	"github.com/GoogleCloudPlatform/go-endpoints/endpoints"
	"golang.org/x/net/context"
	"google.golang.org/appengine/datastore"
)

// Bank represents a banking company
type Bank struct {
	Key     *datastore.Key `json:"id" datastore:"-"`
	Name    string         `json:"name" datastore:"name"`
	Address string         `json:"name" datastore:"address"`
}

type BankList struct {
	Banks []*Bank `json:"banks"`
}

type BankService struct{}

type BankListReq struct {
	Limit int `json:"limit" endpoints:"d=10"`
}

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

// RegisterBancomatService offers list and add user
func RegisterBankService() (*endpoints.RPCService, error) {

	api := &BankService{}
	return endpoints.RegisterService(api,
		"banks", "v1", "Banks Service", true)
}
